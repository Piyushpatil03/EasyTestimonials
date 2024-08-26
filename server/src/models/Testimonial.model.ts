import mongoose from "mongoose";
const { Schema } = mongoose;

const testimonialSchema = new mongoose.Schema(
  {
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
    isLiked : {
      type : Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
