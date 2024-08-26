import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import express from "express";

import { Resolvers } from "./resolvers/Resolvers";
import Company from "./models/Company.model";
import Auth from "./models/Auth.model";
import Testimonial from "./models/Testimonial.model";
import { createClient } from "redis";
import { getUserId } from "./utils";

dotenv.config();

const redisClient = createClient();
redisClient.connect();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((err) => {
    console.log(`Error while connecting to the database - ${err}`);
  });

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: Resolvers,
  context: ({ req }) => {
    return {
      ...req,
      Auth,
      Company,
      Testimonial,
      redisClient,
      userId : req && req.headers.authorization ? getUserId(req) : null
    };
  },
});


server.listen().then(({ url }) => console.log(`Server is running on ${url}`));


