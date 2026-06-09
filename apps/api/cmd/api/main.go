package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"github.com/aldoradiputra/kantorcore-api/internal/database"
)

func main() {
	_ = godotenv.Load()

	ctx := context.Background()

	pool, err := database.NewPool(ctx)
	if err != nil {
		log.Fatalf("[FATAL] database: %v", err)
	}
	defer pool.Close()
	log.Println("[OK] database pool connected")

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-Request-ID"},
		ExposedHeaders:   []string{"X-Request-ID"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/health", handleHealth(pool))
		r.Get("/studio/blueprints", handleGetBlueprints(pool))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful shutdown
	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("[OK] KantorCore API listening on :%s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("[FATAL] server: %v", err)
		}
	}()

	<-shutdown
	log.Println("[INFO] shutting down...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("[FATAL] shutdown: %v", err)
	}
	log.Println("[OK] server stopped")
}

// GET /api/v1/health
func handleHealth(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := pool.Ping(r.Context())
		status := "ok"
		if err != nil {
			status = "degraded"
		}
		writeJSON(w, http.StatusOK, map[string]string{
			"status":  status,
			"service": "kantorcore-api",
		})
	}
}

// GET /api/v1/studio/blueprints
// TODO: Replace mock tenant_id with auth-derived value
func handleGetBlueprints(pool *pgxpool.Pool) http.HandlerFunc {
	const mockTenantID = "00000000-0000-0000-0000-000000000001"

	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := pool.Query(r.Context(),
			`SELECT id, name, schema_def, ui_layout
			 FROM "AppBlueprint"
			 WHERE tenant_id = $1
			 ORDER BY created_at DESC`,
			mockTenantID,
		)
		if err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{
				"error": "failed to query blueprints",
			})
			log.Printf("[ERROR] blueprints query: %v", err)
			return
		}
		defer rows.Close()

		type Blueprint struct {
			ID        string          `json:"id"`
			Name      string          `json:"name"`
			SchemaDef json.RawMessage `json:"schema_def"`
			UILayout  json.RawMessage `json:"ui_layout"`
		}

		blueprints := make([]Blueprint, 0)
		for rows.Next() {
			var bp Blueprint
			if err := rows.Scan(&bp.ID, &bp.Name, &bp.SchemaDef, &bp.UILayout); err != nil {
				writeJSON(w, http.StatusInternalServerError, map[string]string{
					"error": "failed to scan blueprint",
				})
				log.Printf("[ERROR] blueprints scan: %v", err)
				return
			}
			blueprints = append(blueprints, bp)
		}

		if err := rows.Err(); err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{
				"error": "row iteration failed",
			})
			log.Printf("[ERROR] blueprints rows: %v", err)
			return
		}

		writeJSON(w, http.StatusOK, map[string]any{
			"data":  blueprints,
			"count": len(blueprints),
		})
	}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
