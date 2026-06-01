import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'member', 'guest', 'autonomous']);

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email().optional(),
  initials: z.string().max(2),
  role: UserRoleSchema,
  groups: z.array(z.string()),
  lastActive: z.string(),
  isBot: z.boolean(),
  status: z.enum(['active', 'invited', 'deactivated']),
});

export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
