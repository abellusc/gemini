// Q: Why is this outside the React context?
// A: Yes.

export interface IFSA {
    type: string,
    payload: {
        [key: string]: any;
    },
    error?: boolean;
}