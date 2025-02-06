export type Pretiffy<T> = {
    [K in keyof T]: T[K]
}