export const isString = <T = any>(str: string | T): str is string => {
  return typeof str === "string";
};

export const isNumber = <T = any>(num: number | T): num is number => {
  return typeof num === "number";
};

export const isBoolean = <T = any>(bool: boolean | T): bool is boolean => {
  return typeof bool === "boolean";
};

export const isNil = (item: any): boolean => {
  return typeof item === null || typeof item === undefined;
};

export const isUndefined = (item: any): item is undefined => {
  return typeof item === undefined;
};

export const isNull = (item: any): item is null => {
  return typeof item === null;
};
