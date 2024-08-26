import { useQuery } from "@apollo/client";
import "./Dashboard.css";
import { HOME_QUERY } from "../graphql/query";
import { RiExternalLinkLine } from "react-icons/ri";
import { LuCopy } from "react-icons/lu";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import CodeBlock from "../components/CodeBlock";

const Dashboard = () => {
  const { data, loading, error } = useQuery(HOME_QUERY);
  const [copied, setCopied] = useState(false);

  if (loading) {
    return <div className="progressBar"></div>;
  }

  console.log(data);
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/company/${data.home.username}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      });
  };

  return (
    <div className="home_container">
      <div className="first_home">
        <h2 className="home_h2">Hi, {data.home.name}</h2>

        {data.home.username && (
          <div className="home_div_link">
            <span
              className="home_link"
              onClick={() =>
                window.open(
                  `http://localhost:3000/company/${data.home.username}`
                )
              }
            >
              localhost:3000/company/{data.home.username}
              <RiExternalLinkLine className="icon" size={20} />
            </span>
            <span className="span_icon" onClick={handleCopyClick}>
              {copied ? (
                <IoCheckmarkDoneCircle size={20} color="red" />
              ) : (
                <LuCopy size={20} color="red" />
              )}
            </span>
          </div>
        )}
      </div>

      {/* Go to profile page */}
      {!data.home.username && (
        <div className="no_profile_div">
          <p style={{ marginBottom: "25px" }}>
            Please update the Profile section! Get the dynamic public landing
            page of your company and get to know what your customers think about
            the product!
          </p>
          <Link to="/profile" className="profile_btn">
            Update Profile
          </Link>
        </div>
      )}

      {/* Explain the process */}
      {/*<div className="process_div">
        <p>
          Share your public landing page with your loyal customers to get their
          feedback on your product.
        </p>
        <p>
          Pick your 6 favorite testimonials and embed that on your website with
          just copy-paste the embed code
        </p>
      </div>*/}

      {/* Testimonials */}
      {data.home.testimonials && data.home.testimonials.length > 0 && (
        <div>
          <div className="headline_div">
            <h3 className="home_h3">Testimonials</h3>
            <Link to="/testimonials" className="home_btn">
              Read more &gt;
            </Link>
          </div>

          <div className="home_testi_div">
            {data.home.testimonials.map((item: any, index: number) => (
              <div className="home_testi">
                <div className="stars">
                  {[...Array(item.ratings)].map((e, i) => (
                    <span className="star_full" key={i}>
                      <FaStar size={24} />
                    </span>
                  ))}
                </div>
                <p className="short_p">{item.short_testimonial}</p>
                <p className="complete_p">{item.complete_testimonial}</p>
              </div>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="headline_div">
            <h3 className="home_h3">Design Layouts</h3>
            <Link to="/layouts" className="home_btn">
              Read more &gt;
            </Link>
          </div>

          <div className="home_grid_div">
            <img
              src="./theme-base-light.png"
              className="theme_image"
              onClick={() =>
                window.open(
                  `http://localhost:3000/embed/${data.home.username}?theme=light&card=base`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            />

            <div>
              <p className="home_info">
                Embed this dynamic JavaScript code into your website to display
                your beautiful Testimonials Section. Explore more impressive
                grid and carousel layouts with light and dark theme to add to
                your website easily in just one click.
              </p>
              <CodeBlock
                username={data.home.username}
                theme="light"
                card="base"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
