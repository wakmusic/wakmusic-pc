export const isString = (str: any): str is string => {
  return typeof str === "string";
};

export const isNumber = (num: any): num is number => {
  return typeof num === "number";
};

export const isBoolean = (bool: any): bool is boolean => {
  return typeof bool === "boolean";
};

export const isObject = (object: any): object is boolean => {
  return typeof object === "object";
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
