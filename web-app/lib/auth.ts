import jwt from 'jsonwebtoken';

export const USER_COOKIE = 'user_token';
export const ADMIN_COOKIE = 'admin_token';

type JwtPayload = {
  sub: string;
  role: 'user' | 'admin';
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return secret;
}

export function signUserJwt(userId: string) {
  const payload: JwtPayload = { sub: userId, role: 'user' };
  return jwt.sign(payload, getSecret(), { expiresIn: '14d' });
}

export function signAdminJwt(adminUser: string) {
  const payload: JwtPayload = { sub: adminUser, role: 'admin' };
  return jwt.sign(payload, getSecret(), { expiresIn: '14d' });
}

export function verifyJwt(token: string) {
  const decoded = jwt.verify(token, getSecret()) as JwtPayload;
  return decoded;
}

export function safeJsonError(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export function parseCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';').map((p) => p.trim());
  for (const part of parts) {
    const [k, ...rest] = part.split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}

