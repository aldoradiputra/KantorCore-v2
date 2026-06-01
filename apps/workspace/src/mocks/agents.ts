import type { AgentRun, ToolDefinition, Mandate, Process } from '@/types/agent';

export const mockAgentRuns: AgentRun[] = [
  { id: 'run_4190', agentName: 'Lead Triager', status: 'approval', summary: '4 leads ready — review draft responses', module: 'CRM', timestamp: '2m' },
  { id: 'run_4189', agentName: 'AR Collector', status: 'done', summary: 'Sent 18 reminders, 5 responses', module: 'Finance', timestamp: '14m', model: 'haiku-4-5', tokenInput: 1184, tokenOutput: 412, costEstimate: 'Rp 84', durationSec: 8.4 },
  { id: 'run_4188', agentName: 'Compliance Auditor', status: 'failed', summary: 'Failed: timeout at CoreTax DJP endpoint (5x)', module: 'Finance', timestamp: '1h' },
  { id: 'run_4187', agentName: 'Cash Forecaster', status: 'running', summary: 'Running 28 scenarios · 4 of 6 hours elapsed', timestamp: '3h' },
  { id: 'run_4186', agentName: 'Onboarding Buddy', status: 'done', summary: 'Sent welcome packet to Joko Kusuma + 2 others', module: 'HR', timestamp: 'Yesterday' },
  { id: 'run_4185', agentName: 'Expense Categorizer', status: 'review', summary: 'Categorized 41 expenses · 3 uncertain', module: 'Expense', timestamp: 'Yesterday' },
  { id: 'run_4184', agentName: 'PO Approver Assistant', status: 'approval', summary: 'Flagged PO-2026-0091 for senior review (over budget)', timestamp: '2d' },
];

export const mockTools: ToolDefinition[] = [
  { name: 'finance.invoice.send_reminder', description: 'Send a dunning reminder email for an invoice using a registered template.', module: 'IS-FIN', scope: 'customer-data', invocations7d: 184 },
  { name: 'crm.lead.score', description: 'Compute and persist a 0–1 lead score using current ML model.', module: 'IS-CRM', scope: 'read-only', invocations7d: 2402 },
  { name: 'bpjs.employee.sync', description: 'Synchronize an employee\'s BPJS Kesehatan + Ketenagakerjaan record.', module: 'IS-HR', scope: 'government', invocations7d: 218 },
  { name: 'corepay.tax.submit_efaktur', description: 'Submit an e-Faktur batch to CoreTax DJP. Returns receipt + DJP reference.', module: 'IS-FIN', scope: 'government', invocations7d: 14 },
  { name: 'sales.order.discount_request', description: 'Submit a discount > default-threshold for approval. Auto-tagged with reason.', module: 'IS-SALES', scope: 'write', invocations7d: 32 },
  { name: 'docs.kms.search', description: 'Search the public + private knowledge base. Returns titles + excerpts.', module: 'IS-DOCS', scope: 'read-only', invocations7d: 1144 },
];

export const mockMandates: Mandate[] = [
  { id: 'm001-0000-0000-0000-000000000001', agentName: 'AR Collector', entity: 'FIN.Invoice', actions: [{ label: 'read', variant: 'default' }, { label: 'send_reminder', variant: 'info' }, { label: 'update_terms ±15d', variant: 'warn' }], conditions: "customer.tier ≠ 'enterprise'", grantedBy: 'Lestari Putri', expiresAt: '2026-12-31' },
  { id: 'm001-0000-0000-0000-000000000002', agentName: 'AR Collector', entity: 'CRM.Customer', actions: [{ label: 'read', variant: 'default' }], grantedBy: 'Lestari Putri', expiresAt: '2026-12-31' },
  { id: 'm001-0000-0000-0000-000000000003', agentName: 'Lead Triager', entity: 'CRM.Lead', actions: [{ label: 'read', variant: 'default' }, { label: 'score', variant: 'info' }, { label: 'draft_reply (queue)', variant: 'warn' }], grantedBy: 'Andi Wijaya', expiresAt: 'never' },
  { id: 'm001-0000-0000-0000-000000000004', agentName: 'Compliance Auditor', entity: 'FIN.* (read-only)', actions: [{ label: 'read', variant: 'default' }, { label: 'flag', variant: 'info' }], conditions: 'never_send_email', grantedBy: 'Lestari Putri', expiresAt: 'never' },
  { id: 'm001-0000-0000-0000-000000000005', agentName: 'Onboarding Buddy', entity: 'HR.Employee', actions: [{ label: 'read', variant: 'default' }, { label: 'send_email', variant: 'info' }], conditions: "employee.status = 'new'", grantedBy: 'Andi Wijaya', expiresAt: 'never' },
];

export const mockProcesses: Process[] = [
  { id: 'p001-0000-0000-0000-000000000001', name: 'Auto-overdue invoices', description: 'Mark invoices as overdue when due_date passes; notify owner.', type: 'deterministic', steps: ['cron 0 *', 'find', 'update', 'notify'], lastRunSummary: 'Runs daily · 1,841 invoices touched' },
  { id: 'p001-0000-0000-0000-000000000002', name: 'Dunning sequence', description: 'Send reminder, escalate to AI for personalized followup if no response.', type: 'hybrid', steps: ['scheduled', 'email', 'wait 7d', 'ai.draft', 'approve'], lastRunSummary: 'Last run 14m ago · 18 / 23 sent' },
  { id: 'p001-0000-0000-0000-000000000003', name: 'Lead → first response', description: 'Triage a new lead, score it, draft a personalized response for review.', type: 'probabilistic', steps: ['on lead.create', 'enrich', 'ai.score', 'ai.draft', 'queue'], lastRunSummary: '4 drafts awaiting review' },
  { id: 'p001-0000-0000-0000-000000000004', name: 'BPJS · employee sync', description: 'Sync all active employees with BPJS Kesehatan + Ketenagakerjaan twice daily.', type: 'deterministic', steps: ['cron 12h', 'find new', 'bpjs.sync', 'log'], lastRunSummary: 'Last 09:00 · 218 records · 0 errors' },
  { id: 'p001-0000-0000-0000-000000000005', name: 'PO > 50jt approval', description: 'Route POs above Rp 50jt to senior approver with AI risk summary.', type: 'hybrid', steps: ['on po.create', 'check.budget', 'ai.summarize', 'approve'], lastRunSummary: '7d: 12 routed · 11 approved, 1 rejected' },
  { id: 'p001-0000-0000-0000-000000000006', name: 'Expense triage', description: 'Categorize expenses from receipt images, flag anomalies for review.', type: 'probabilistic', steps: ['on expense.create', 'ocr', 'ai.classify', 'queue?'], lastRunSummary: 'Last 24h: 41 processed · 3 uncertain' },
];
