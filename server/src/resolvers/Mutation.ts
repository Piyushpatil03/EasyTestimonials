import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateRandomNumber } from "../utils";

dotenv.config();

const Signup = async (parent: any, args: any, context: any, info: any) => {
  const password = bcrypt.hashSync(args.password, 10);

  const auth = await context.Auth.create({
    ...args,
    password,
  });

  const token = jwt.sign({ userId: auth._id }, process.env.JWT_SECRET_KEY);

  return {
    token,
    auth,
  };
};

const Login = async (parent: any, args: any, context: any, info: any) => {
  const auth = await context.Auth.findOne({ email: args.email });

  if (!auth) {
    throw new Error("User not exists");
  }

  const valid = await bcrypt.compare(args.password, auth.password);
  if (!valid) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign({ userId: auth._id }, process.env.JWT_SECRET_KEY);

  return {
    token,
    auth,
  };
};

const Update = async (parent: any, args: any, context: any, info: any) => {
  const { userId } = context.userId;

  const auth = await context.Auth.findOne({ _id: userId });
  if (auth.company) {
    const company = await context.Company.findOne({ _id: auth.company });
    company.company_name = args.company_name,
    company.website = args.website,
    company.desc = args.desc,
    company.service = args.service;
    await company.save();

  } else {
    const newCompany = await context.Company.create({
      // company_name: args.company_name,
      // website: args.website,
      // desc: args.desc,
      // service: args.service,
      ...args
    });
    auth.company = newCompany._id;
    await newCompany.save();
  }

  // CREATE UNIQUE USERNAME for each company - user
  if (!auth.username || auth.username !== args.username) {
    auth.username =
      args.company_name.replace(/\s+/g, "") + generateRandomNumber(3);
  }

  await auth.save();
  await auth.populate("company");

  return auth;
};

const addTestimonial = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { username, ...formFields } = args;

  const auth = await context.Auth.findOne({ username: username });
  const testimonial = await context.Testimonial.create({ ...formFields });

  auth.testimonials.push(testimonial._id);

  await auth.save();
  await testimonial.save();

  return auth;
};

const addLikes = async (parent: any, args: any, context: any, info: any) => {
  const redisKey = `testimonials:${args.username}`;

  try {
    for (const input of args.actions) {
      const updated = await context.Testimonial.findByIdAndUpdate(
        input._id,
        {
          isLiked: input.isLiked,
        },
        { new: true }
      );

      // STORE IN REDIS FOR CACHED FAVORITE TESTIMONIALS
      if (input.isLiked) {
        await context.redisClient.hSet(
          redisKey,
          input._id.toString(),
          JSON.stringify(updated)
        );
      } else {
        await context.redisClient.hDel(redisKey, input._id.toString());
      }
    }
    return { success: true, message: "Updates applied successfully" };
  } catch (err) {
    return { success: false, message: err };
  }
};

module.exports = {
  Signup,
  Login,
  Update,
  addTestimonial,
  addLikes,
};
