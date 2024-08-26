"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const authSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    testimonials: [{
            type: Schema.Types.ObjectId,
            ref: "Testimonial"
        }]
}, {
    timestamps: true,
});
const Auth = mongoose_1.default.model("Auth", authSchema);
exports.default = Auth;
//# sourceMappingURL=Auth.model.js.map