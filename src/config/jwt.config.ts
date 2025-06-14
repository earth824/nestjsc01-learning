import { jwtEnvSchema } from '@/config/schema';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const { success, data } = jwtEnvSchema.safeParse(process.env);
  if (!success) throw new Error('JWT env config error');

  return {
    accessSecret: data.JWT_ACCESS_SECRET,
    accessExpires: data.JWT_ACCESS_EXPIRES,
    refreshSecret: data.JWT_REFRESH_SECRET,
    refreshExpires: data.JWT_REFRESH_EXPIRES
  };
});
