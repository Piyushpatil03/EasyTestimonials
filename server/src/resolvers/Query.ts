import mongoose from "mongoose";

function info() {
  return "This is an Testing GraphQL API";
}

async function profile(parent: any, args: any, context: any) {
  const { userId } = context.userId;

  return await context.Auth.findOne({ _id: userId }).populate("company");
}

async function comp(parent: any, args: any, context: any) {
  const { username } = args;
  console.log("username", username);

  return await context.Auth.findOne({ username: username }).populate("company");
}

async function testi(parent: any, args: any, context: any) {
  const { userId } = context.userId;

  return await context.Auth.findOne({ _id: userId }).populate("testimonials");
}

async function embed(parent: any, args: any, context: any) {
  const redisKey = `testimonials:${args.username}`;

  // GET THIS DATA FROM REDIS
  // return await context.Auth.findOne({ username : username }).populate("testimonials");
  const testimonialData = await context.redisClient.hGetAll(redisKey);

  const testimonials: any[] = [];
  for (const [id, testiString] of Object.entries(testimonialData)) {
    try {
      testimonials.push(JSON.parse(testiString as string));
    } catch (err) {
      console.error("Error passing JSON", err);
    }
  }
  return testimonials;
}

async function home(parent: any, args: any, context: any) {
  const { userId } = context.userId;

  return await context.Auth.findOne({ _id: userId }).populate({
    path: "testimonials",
    options: { limit: 3 },
  });
}

async function search(parent: any, args: any, context: any) {
  const { userId } = context.userId;

  const allTestimonials = await context.Auth.findOne({ _id : userId}).populate("testimonials");
  const testimonialIds = allTestimonials.testimonials.map((testimonial : any) => testimonial._id);

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

  return await context.Testimonial.aggregate(pipeline);
}

module.exports = { info, profile, comp, testi, embed, home, search };
