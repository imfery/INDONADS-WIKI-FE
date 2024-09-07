export type ParsedJwt = {
    aud?: string;
    sub?: string;
    nbf?: number;
    iss?: string;
    exp?: number;
    email?: string;
};
