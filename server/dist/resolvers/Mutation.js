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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../utils");
dotenv_1.default.config();
const Signup = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const password = bcryptjs_1.default.hashSync(args.password, 10);
    const auth = yield context.Auth.create(Object.assign(Object.assign({}, args), { password }));
    const token = jsonwebtoken_1.default.sign({ userId: auth._id }, process.env.JWT_SECRET_KEY);
    return {
        token,
        auth,
    };
});
const Login = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield context.Auth.findOne({ email: args.email });
    if (!auth) {
        throw new Error("User not exists");
    }
    const valid = yield bcryptjs_1.default.compare(args.password, auth.password);
    if (!valid) {
        throw new Error("Invalid Password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: auth._id }, process.env.JWT_SECRET_KEY);
    return {
        token,
        auth,
    };
});
const Update = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = context.userId;
    const auth = yield context.Auth.findOne({ _id: userId });
    if (auth.company) {
        const company = yield context.Company.findOne({ _id: auth.company });
        company.company_name = args.company_name,
            company.website = args.website,
            company.desc = args.desc,
            company.service = args.service;
        yield company.save();
    }
    else {
        const newCompany = yield context.Company.create(Object.assign({}, args));
        auth.company = newCompany._id;
        yield newCompany.save();
    }
    // CREATE UNIQUE USERNAME for each company - user
    if (!auth.username || auth.username !== args.username) {
        auth.username =
            args.company_name.replace(/\s+/g, "") + (0, utils_1.generateRandomNumber)(3);
    }
    yield auth.save();
    yield auth.populate("company");
    return auth;
});
const addTestimonial = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = args, formFields = __rest(args, ["username"]);
    const auth = yield context.Auth.findOne({ username: username });
    const testimonial = yield context.Testimonial.create(Object.assign({}, formFields));
    auth.testimonials.push(testimonial._id);
    yield auth.save();
    yield testimonial.save();
    return auth;
});
const addLikes = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const redisKey = `testimonials:${args.username}`;
    try {
        for (const input of args.actions) {
            const updated = yield context.Testimonial.findByIdAndUpdate(input._id, {
                isLiked: input.isLiked,
            }, { new: true });
            // STORE IN REDIS FOR CACHED FAVORITE TESTIMONIALS
            if (input.isLiked) {
                yield context.redisClient.hSet(redisKey, input._id.toString(), JSON.stringify(updated));
            }
            else {
                yield context.redisClient.hDel(redisKey, input._id.toString());
            }
        }
        return { success: true, message: "Updates applied successfully" };
    }
    catch (err) {
        return { success: false, message: err };
    }
});
module.exports = {
    Signup,
    Login,
    Update,
    addTestimonial,
    addLikes,
};
//# sourceMappingURL=Mutation.js.map