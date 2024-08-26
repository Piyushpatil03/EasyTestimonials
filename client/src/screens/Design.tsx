import { useQuery } from "@apollo/client";
import CodeBlock from "../components/CodeBlock";
import "./Design.css";
import { PROFILE_QUERY } from "../graphql/query";
import { Link } from "react-router-dom";

const Design = () => {
  const { data } = useQuery(PROFILE_QUERY);

  return (
    <div className="test_container">
      <h2 className="head_test">Choose Your Favorite Layout!</h2>
      <p className="p_test">
        Click on the images to see how your testimonials would look like in your
        website!
      </p>

      {data && data.profile && (
        <>
          <h3 className="h3_design">Grid Layouts</h3>
          <div className="div_grid">
            <div>
              <img
                src="./theme-base-light.png"
                className="theme_image"
                onClick={() =>
                  window.open(
                    `http://localhost:3000/embed/${data.profile.username}?theme=light&card=base`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />
              <CodeBlock
                username={data.profile.username}
                theme="light"
                card="base"
              />
            </div>
            <div>
              <img
                src="./theme-base-dark.png"
                className="theme_image"
                onClick={() =>
                  window.open(
                    `http://localhost:3000/embed/${data.profile.username}?theme=light&card=base`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />
              <CodeBlock
                username={data.profile.username}
                theme="dark"
                card="base"
              />
            </div>
          </div>

          <h3 className="h3_design">Carousel Layouts</h3>
          <div className="div_grid">
            <div>
              <img
                src="./theme-carousel-light.png"
                className="theme_image"
                onClick={() =>
                  window.open(
                    `http://localhost:3000/embed/${data.profile.username}?theme=light&card=base`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />
              <CodeBlock
                username={data.profile.username}
                theme="light"
                card="carousel"
              />
            </div>
            <div>
              <img
                src="./theme-carousel-dark.png"
                className="theme_image"
                onClick={() =>
                  window.open(
                    `http://localhost:3000/embed/${data.profile.username}?theme=light&card=base`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />
              <CodeBlock
                username={data.profile.username}
                theme="dark"
                card="carousel"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Design;
