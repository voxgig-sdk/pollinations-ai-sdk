"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollinationsAiError = void 0;
class PollinationsAiError extends Error {
    isPollinationsAiError = true;
    sdk = 'PollinationsAi';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PollinationsAiError = PollinationsAiError;
//# sourceMappingURL=PollinationsAiError.js.map