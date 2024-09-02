const JWT_REGEX_PATTERN = /(^[\w-]*\.[\w-]*\.[\w-]*$)/;

export const isJwtToken = (token: string) => {
    const stringifiedToken = `${token}`;
    return JWT_REGEX_PATTERN.test(stringifiedToken);
};
