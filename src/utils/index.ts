export const JWT_COOKIE_CONFIG = {
    path: '/',
    domain: 'http://localhost:3000',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'lax',
};
export { isExpired, isInvalidOrExpired } from './isInvalidOrExpired';
export { isJwtToken } from './isJwtToken';
export { parseJWT } from './parseJwt';
