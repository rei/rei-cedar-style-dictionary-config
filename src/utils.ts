export const BASE_FONT_SIZE = 10;

export const filterSourceTokensAndType = (token: any, type: string | string[]): boolean => {
  const types = Array.isArray(type) ? type : [type];
  return token.path[0] !== 'options' && token.path[0] !== 'theme' && types.includes(token.$type);
};
