import { useQuery } from "@apollo/client";
import { useFetcher, useLocation, useParams } from "react-router-dom";
import { EMBED_QUERY } from "../graphql/query";
import { useEffect, useState } from "react";
import "./Embed.css";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Embed = () => {
  const { username } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const theme = queryParams.get("theme") || "light";
  const card = queryParams.get("card");

  const { data } = useQuery(EMBED_QUERY, {
    variables: { username },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % data.embed.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.embed.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const updateHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ height }, "*");
    };

    // Update height on content load and window resize
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className={`container_${theme}`}>
      <h3 className="embed_h3">Words from our amazing customers!</h3>

      <div className={`${card}-container`}>
        {card === "carousel" && (
          <button className={`${card}-btn prev`} onClick={handlePrev}>
            <FaChevronLeft />
          </button>
        )}
        {data && data.embed && (
          <div className={`embed_grid_${card}`}>
            {data.embed.map((item: any, index: number) => (
              <div
                key={item._id}
                className={`embed_item_${card}`}
                style={
                  card === "carousel"
                    ? { display: index === currentIndex ? "block" : "none" }
                    : {}
                }
              >
                {card === "carousel" && (
                  <div style={{ textAlign: "left" }}>
                    <h4 className="second_head_carousel">
                      {item.short_testimonial}
                    </h4>
                    <p className="second_p_carousel">
                      {item.complete_testimonial}
                    </p>
                  </div>
                )}

                <div className={`first_embed`}>
                  <img
                    src={`https://picsum.photos/id/${index}/50/50`}
                    className="company_image"
                  />

                  <div>
                    <p className="first_p">
                      <b>{item.customer_name}</b>
                    </p>
                    <p className="first_p">
                      {item.designation} at {item.org_name}
                    </p>
                  </div>
                </div>

                {card === "base" && (
                  <div>
                    <div className="stars">
                      {[...Array(item.ratings)].map((e, i) => (
                        <span className="star_full" key={i}>
                          <FaStar size={24} />
                        </span>
                      ))}
                    </div>
                    <h4 className="second_head">{item.short_testimonial}</h4>
                    <p className="second_p">{item.complete_testimonial}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {card === "carousel" && (
          <button className={`${card}-btn next`} onClick={handleNext}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Embed;
