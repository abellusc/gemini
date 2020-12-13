// Q: Why is this outside the React context?
// A: Yes.

export interface IFSA<T> {
    type: string,
    payload: T | null,
    error?: boolean;
}