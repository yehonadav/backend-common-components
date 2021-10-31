export const getHandlerNames = <T>(object:T):Record<keyof T, string> => {
  const paths:any = {};
  Object.keys(object).forEach(key => {paths[key] = `handler.${key}`});
  return paths;
}
