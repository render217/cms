export interface SuccessType<T> {
    message: string;
    payload: T;
}

export interface ErrorType {
    message: string;
}
