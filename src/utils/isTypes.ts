export const isString = (str: unknown): str is string => {
  return typeof str === "string";
};

export const isNumber = (num: unknown): num is number => {
  return typeof num === "number";
};

export const isBoolean = (bool: unknown): bool is boolean => {
  return typeof bool === "boolean";
};

export const isObject = (object: unknown): object is object => {
  return typeof object === "object";
};

export const isNil = (item: unknown): item is null | undefined => {
  return typeof item === null || typeof item === undefined;
};

export const isUndefined = (item: unknown): item is undefined => {
  return typeof item === undefined;
};

export const isNull = (item: unknown): item is null => {
  return typeof item === null;
};
