export const getEnumNumbers = (e:any):number[] => {
  const keys = Object.keys(e).filter(k => typeof e[k as any] === "number");
  return keys.map(k => e[k as any]);
}