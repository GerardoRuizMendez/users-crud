"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddlewareController = void 0;
const token_1 = require("../../../../core/token/token");
class AuthMiddlewareController {
    constructor() {
        this.token = new token_1.authToken();
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token) {
                res.status(401).json({ error: "Authorization needed" });
                return;
            }
            const tokenParts = token.split(" ");
            if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
                res.status(400).json({ error: "Invalid Token format" });
                return;
            }
            const tokenValidity = this.token.verifyAccessToken(tokenParts[1]);
            if (!tokenValidity) {
                res.status(403).json({ error: "Invalid access token" });
                return;
            }
            req.userId = tokenParts[1];
            next();
        });
    }
}
exports.AuthMiddlewareController = AuthMiddlewareController;
