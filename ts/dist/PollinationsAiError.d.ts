import { Context } from './Context';
declare class PollinationsAiError extends Error {
    isPollinationsAiError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PollinationsAiError };
