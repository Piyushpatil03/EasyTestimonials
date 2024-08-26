"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_1 = require("apollo-server");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Resolvers_1 = require("./resolvers/Resolvers");
const Company_model_1 = __importDefault(require("./models/Company.model"));
const Auth_model_1 = __importDefault(require("./models/Auth.model"));
const Testimonial_model_1 = __importDefault(require("./models/Testimonial.model"));
const redis_1 = require("redis");
const utils_1 = require("./utils");
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)();
redisClient.connect();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB database connected");
})
    .catch((err) => {
    console.log(`Error while connecting to the database - ${err}`);
});
const server = new apollo_server_1.ApolloServer({
    typeDefs: fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers: Resolvers_1.Resolvers,
    context: ({ req }) => {
        return Object.assign(Object.assign({}, req), { Auth: Auth_model_1.default,
            Company: Company_model_1.default,
            Testimonial: Testimonial_model_1.default,
            redisClient, userId: req && req.headers.authorization ? (0, utils_1.getUserId)(req) : null });
    },
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
//# sourceMappingURL=index.js.map