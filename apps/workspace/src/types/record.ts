import { z } from 'zod';

export const InvoiceStatusSchema = z.enum(['draft', 'sent', 'overdue', 'paid', 'closed']);

export const LineItemSchema = z.object({
  id: z.string().uuid(),
  lineNumber: z.number(),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  total: z.number(),
});

export const AIFieldValueSchema = z.object({
  label: z.string(),
  value: z.string(),
  model: z.string(),
  trigger: z.enum(['on_create', 'on_change', 'manual']),
  lastRunAt: z.string(),
});

export const ChatterEventSchema = z.object({
  id: z.string().uuid(),
  actorName: z.string(),
  actorInitials: z.string(),
  actorType: z.enum(['user', 'agent', 'system']),
  action: z.string(),
  content: z.string().optional(),
  timestamp: z.string(),
  badges: z.array(z.string()).optional(),
});

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  number: z.string(),
  customerName: z.string(),
  customerNpwp: z.string().optional(),
  status: InvoiceStatusSchema,
  issuedAt: z.string(),
  dueDate: z.string(),
  daysOverdue: z.number(),
  terms: z.string(),
  total: z.number(),
  subtotal: z.number(),
  taxRate: z.number(),
  taxAmount: z.number(),
  ownerId: z.string().uuid(),
  ownerName: z.string(),
  picName: z.string().optional(),
  picPhone: z.string().optional(),
  linkedPo: z.string().optional(),
  items: z.array(LineItemSchema),
  reminderCount: z.number(),
  paymentCount: z.number(),
  activityCount: z.number(),
  aiFields: z.array(AIFieldValueSchema),
  chatter: z.array(ChatterEventSchema),
});

export const DealStageSchema = z.enum(['qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost']);

export const DealSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  subtitle: z.string().optional(),
  stage: DealStageSchema,
  accountName: z.string(),
  ownerId: z.string().uuid(),
  ownerInitials: z.string(),
  value: z.number(),
  closeDate: z.string(),
  aiScore: z.number(),
  aiScoreLabel: z.enum(['High', 'Med', 'Low']),
  lastActivity: z.string(),
  daysInStage: z.number().optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
export type LineItem = z.infer<typeof LineItemSchema>;
export type AIFieldValue = z.infer<typeof AIFieldValueSchema>;
export type ChatterEvent = z.infer<typeof ChatterEventSchema>;
export type Deal = z.infer<typeof DealSchema>;
export type DealStage = z.infer<typeof DealStageSchema>;
