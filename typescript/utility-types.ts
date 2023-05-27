// https://stackoverflow.com/questions/52677576/typescript-discriminated-union-allows-invalid-state/52678379#52678379
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends unknown ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>> : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;
