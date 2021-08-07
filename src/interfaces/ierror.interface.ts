export interface IError {
    name: string,
    message: string
}
export function isIError(object: any): object is IError {
    return 'message' in object;
}