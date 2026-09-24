"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NidApplicationSystemError = void 0;
class NidApplicationSystemError extends Error {
    isNidApplicationSystemError = true;
    sdk = 'NidApplicationSystem';
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
exports.NidApplicationSystemError = NidApplicationSystemError;
//# sourceMappingURL=NidApplicationSystemError.js.map