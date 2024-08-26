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
function info() {
    return "This is an Testing GraphQL API";
}
function profile(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = context.userId;
        return yield context.Auth.findOne({ _id: userId }).populate("company");
    });
}
function comp(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = args;
        console.log("username", username);
        return yield context.Auth.findOne({ username: username }).populate("company");
    });
}
function testi(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = context.userId;
        return yield context.Auth.findOne({ _id: userId }).populate("testimonials");
    });
}
function embed(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const redisKey = `testimonials:${args.username}`;
        // GET THIS DATA FROM REDIS
        // return await context.Auth.findOne({ username : username }).populate("testimonials");
        const testimonialData = yield context.redisClient.hGetAll(redisKey);
        const testimonials = [];
        for (const [id, testiString] of Object.entries(testimonialData)) {
            try {
                testimonials.push(JSON.parse(testiString));
            }
            catch (err) {
                console.error("Error passing JSON", err);
            }
        }
        return testimonials;
    });
}
function home(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = context.userId;
        return yield context.Auth.findOne({ _id: userId }).populate({
            path: "testimonials",
            options: { limit: 3 },
        });
    });
}
function search(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = context.userId;
        const allTestimonials = yield context.Auth.findOne({ _id: userId }).populate("testimonials");
        const testimonialIds = allTestimonials.testimonials.map((testimonial) => testimonial._id);
        // MongoDB aggregation pipeline using Atlas Vector Search Indexing
        const pipeline = [
            {
                $search: {
                    index: "searchTestimonials",
                    text: {
                        query: args.searchTerm,
                        path: {
                            wildcard: "*",
                        },
                        fuzzy: {},
                    },
                },
            },
            // Match stage to filter by testimonial IDs
            {
                $match: {
                    _id: { $in: testimonialIds },
                },
            },
        ];
        return yield context.Testimonial.aggregate(pipeline);
    });
}
module.exports = { info, profile, comp, testi, embed, home, search };
//# sourceMappingURL=Query.js.map