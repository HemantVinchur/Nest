"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGaurd = void 0;
class AuthGaurd {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}
exports.AuthGaurd = AuthGaurd;
//# sourceMappingURL=auth.gaurd.js.map