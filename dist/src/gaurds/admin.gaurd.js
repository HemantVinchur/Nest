"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGaurd = void 0;
class AdminGaurd {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        return request.currentUser.admin;
    }
}
exports.AdminGaurd = AdminGaurd;
//# sourceMappingURL=admin.gaurd.js.map