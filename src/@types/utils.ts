export type setter<T> = (val: ((val: T) => T) | T) => void;
