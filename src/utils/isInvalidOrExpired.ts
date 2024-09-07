import { parseJWT } from './parseJwt';
import type { ParsedJwt } from './types';

export const isExpired = (time: number): boolean => {
    return Date.now() >= Number(time) * 1000;
};

export const isInvalidOrExpired = (token: string): boolean => {
    const data: ParsedJwt = parseJWT(token);
    const isInvalidToken = data.exp === undefined;

    return isInvalidToken || isExpired(Number(data.exp));
};
