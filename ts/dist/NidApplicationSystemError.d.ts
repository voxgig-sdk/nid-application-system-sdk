import { Context } from './Context';
declare class NidApplicationSystemError extends Error {
    isNidApplicationSystemError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NidApplicationSystemError };
