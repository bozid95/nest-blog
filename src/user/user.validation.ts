import { Role } from '@prisma/client';
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER_USER: ZodType = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.nativeEnum(Role).default(Role.USER).optional(),
  });
}
