import { z } from 'zod';

export const ChannelTypeSchema = z.enum(['whatsapp', 'email', 'web_chat', 'sms', 'telegram', 'team_chat', 'helpdesk']);

export const ThreadSchema = z.object({
  id: z.string().uuid(),
  channelType: ChannelTypeSchema,
  contactName: z.string(),
  preview: z.string(),
  timestamp: z.string(),
  unread: z.boolean(),
  badges: z.array(z.object({ label: z.string(), variant: z.string() })),
  linkedRecordId: z.string().optional(),
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  threadId: z.string().uuid(),
  senderName: z.string(),
  senderInitials: z.string().optional(),
  senderType: z.enum(['user', 'contact', 'agent', 'system']),
  content: z.string(),
  timestamp: z.string(),
  direction: z.enum(['inbound', 'outbound', 'internal']),
  channel: ChannelTypeSchema,
  status: z.enum(['sent', 'delivered', 'read']).optional(),
});

export type Thread = z.infer<typeof ThreadSchema>;
export type Message = z.infer<typeof MessageSchema>;
