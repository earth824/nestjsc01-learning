import { z } from 'zod';

const baseEnvSchema = z.object({
  PORT: z.coerce.number().min(0).max(65535).int(),
  DATABASE_URL: z.string().url()
});

export const jwtEnvSchema = z.object({
  JWT_ACCESS_SECRET: z.string().min(64),
  JWT_ACCESS_EXPIRES: z.coerce.number().positive(),
  JWT_REFRESH_SECRET: z.string().min(64),
  JWT_REFRESH_EXPIRES: z.coerce.number().positive()
});

export const envSchema = baseEnvSchema.merge(jwtEnvSchema);
