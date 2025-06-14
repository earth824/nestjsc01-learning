import { envSchema } from '@/config/schema';

export function validate(config: unknown) {
  const { data, success, error } = envSchema.safeParse(config);

  if (!success) {
    console.log(error.issues);
    throw new Error('Env validation failed');
  }

  return data;
}
