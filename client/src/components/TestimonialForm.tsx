import { useState } from "react";
import "./TestimonialForm.css";
import { useMutation } from "@apollo/client";
import { TESTIMONIAL_MUTATION } from "../graphql/mutations";
import toast, { Toaster } from "react-hot-toast";

const TestimonialForm = ({ username }: { username: string | undefined }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    city: "",
    org: "",
    ratings: 0,
    short: "",
    full: "",
  });

  const [addTestimonial, { loading, error }] =
    useMutation(TESTIMONIAL_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addTestimonial({
        variables: {
          username: username,
          customer_name: formData.name,
          designation: formData.designation,
          city: formData.city,
          org_name: formData.org,
          ratings: formData.ratings,
          short_testimonial: formData.short,
          complete_testimonial: formData.full,
        },
        onCompleted: () => {
          toast.success("Feedback Sent! 😊");
          console.log("Testimonials Sent");
        },
      });
    } catch (err) {
      toast.error("Sorry! It did not work this time 😓");
      console.log("Error while sending testimonial", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Toaster />
      <div>
        <div>
          <label className="label">Full Name</label>
        </div>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="two_inputs">
        <div>
          <div>
            <label className="label">Designation</label>
          </div>
          <div>
            <input
              className="input-2"
              type="string"
              placeholder="Engineer / Student"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label className="label">City</label>
          </div>
          <div>
            <input
              className="input-2"
              type="string"
              placeholder="Mumbai, India"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          <label className="label">Organization / University</label>
        </div>
        <div>
          <input
            className="input"
            type="string"
            placeholder="Amazon Inc"
            value={formData.org}
            onChange={(e) => setFormData({ ...formData, org: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label className="label">Ratings</label>
        </div>
        <div>
          <input
            className="input"
            type="range"
            min="1"
            max="5"
            value={formData.ratings}
            onChange={(e) =>
              setFormData({ ...formData, ratings: Number(e.target.value) })
            }
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label className="label">First thought</label>
        </div>
        <div>
          <input
            className="input"
            type="string"
            placeholder="It was Awesome!"
            value={formData.short}
            onChange={(e) =>
              setFormData({ ...formData, short: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label className="label">Share your thoughts freely!</label>
        </div>
        <div>
          <textarea
            className="textarea"
            placeholder="Their customer service was really helpful in every aspects and they keep clean everytime! I really liked that!"
            value={formData.full}
            onChange={(e) => setFormData({ ...formData, full: e.target.value })}
            required
          />
        </div>
      </div>

      <button type="submit" className="save">
        Send Feedback
      </button>
    </form>
  );
};

export default TestimonialForm;
