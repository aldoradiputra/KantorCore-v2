import { z } from 'zod';

export const AgentRunStatusSchema = z.enum(['running', 'done', 'failed', 'approval', 'review']);

export const ToolCallSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  args: z.string(),
  status: z.string(),
  durationMs: z.number().optional(),
});

export const AgentRunSchema = z.object({
  id: z.string(),
  agentName: z.string(),
  status: AgentRunStatusSchema,
  summary: z.string(),
  module: z.string().optional(),
  timestamp: z.string(),
  toolCalls: z.array(ToolCallSchema).optional(),
  tokenInput: z.number().optional(),
  tokenOutput: z.number().optional(),
  costEstimate: z.string().optional(),
  model: z.string().optional(),
  durationSec: z.number().optional(),
});

export const MandateSchema = z.object({
  id: z.string().uuid(),
  agentName: z.string(),
  entity: z.string(),
  actions: z.array(z.object({ label: z.string(), variant: z.string() })),
  conditions: z.string().optional(),
  grantedBy: z.string(),
  expiresAt: z.string(),
});

export const ToolDefinitionSchema = z.object({
  name: z.string(),
  description: z.string(),
  module: z.string(),
  scope: z.string(),
  invocations7d: z.number(),
});

export const ProcessTypeSchema = z.enum(['deterministic', 'hybrid', 'probabilistic']);

export const ProcessSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  type: ProcessTypeSchema,
  steps: z.array(z.string()),
  lastRunSummary: z.string(),
});

export type AgentRun = z.infer<typeof AgentRunSchema>;
export type ToolCall = z.infer<typeof ToolCallSchema>;
export type Mandate = z.infer<typeof MandateSchema>;
export type ToolDefinition = z.infer<typeof ToolDefinitionSchema>;
export type Process = z.infer<typeof ProcessSchema>;
