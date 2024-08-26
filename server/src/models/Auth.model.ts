import mongoose from "mongoose";
const { Schema } = mongoose;

const authSchema = new mongoose.Schema(
  {
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
    username : {
      type: String,
      unique: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    testimonials : [{
      type: Schema.Types.ObjectId,
      ref: "Testimonial"
    }]
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
