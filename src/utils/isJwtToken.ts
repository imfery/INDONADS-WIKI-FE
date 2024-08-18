const JWT_REGEX_PATTERN = /(^[\w-]*\.[\w-]*\.[\w-]*$)/;

export const isJwtToken = (token: any) => {
  const stringifiedToken = `${token}`;
  return JWT_REGEX_PATTERN.test(stringifiedToken);
};