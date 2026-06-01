import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
  unread: z.boolean(),
  icon: z.string(),
  iconVariant: z.enum(['default', 'accent', 'warn', 'danger', 'success']),
  category: z.enum(['all', 'mention', 'approval', 'agent']),
});

export type Notification = z.infer<typeof NotificationSchema>;
