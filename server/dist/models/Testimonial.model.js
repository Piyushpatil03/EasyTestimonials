"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const testimonialSchema = new mongoose_1.default.Schema({
    customer_name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    org_name: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    short_testimonial: {
        type: String,
        required: true,
    },
    complete_testimonial: {
        type: String,
        required: true,
    },
    isLiked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
const Testimonial = mongoose_1.default.model("Testimonial", testimonialSchema);
exports.default = Testimonial;
//# sourceMappingURL=Testimonial.model.js.map