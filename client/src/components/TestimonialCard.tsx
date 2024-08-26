import { useCallback, useEffect, useState } from "react";
import "./TestimonialCard.css";
import { FaStar } from "react-icons/fa6";
import { TiHeartOutline } from "react-icons/ti";
import { BsArrowThroughHeartFill } from "react-icons/bs";
import { getLiked, setLiked } from "../utils/HelperFunctions";
import debounce from "lodash.debounce";
import { useMutation } from "@apollo/client";
import { LIKED_MUTATION } from "../graphql/mutations";

const TestimonialCard = ({
  item,
  handleLike,
  handleDislike,
  likedOption,
}: {
  item: any;
  handleLike: Function;
  handleDislike: Function;
  likedOption: Boolean;
}) => {
  return (
    <div className="card_container">
      <div className="icon_div">
        <div>
          <FaStar />
          <span style={{ paddingLeft: "5px" }}>{item.ratings} / 5 </span>
        </div>

        <div>
          {likedOption ? (
            <BsArrowThroughHeartFill
              size={24}
              color="red"
              className="heart_icon"
              onClick={() => handleDislike(item._id)}
            />
          ) : (
            <TiHeartOutline
              className="heart_icon"
              size={24}
              onClick={() => handleLike(item._id)}
            />
          )}
        </div>
      </div>

      <div style={{ padding: "10px 0px" }}>
        <b>{item.short_testimonial}</b>
      </div>
      <div>{item.complete_testimonial}</div>

      <div className="right_name">
        <span>
          - {item.customer_name}, {item.org_name}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
