"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.getUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenPayload = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
};
const getUserId = (req) => {
    if (req) {
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new Error("No Token Found");
        }
        return getTokenPayload(authToken);
    }
    else {
        throw new Error('Not authenticated');
    }
};
exports.getUserId = getUserId;
const generateRandomNumber = (length) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandomNumber = generateRandomNumber;
//# sourceMappingURL=utils.js.map