import { Testimonial } from "../screens/Testimonials";
import { getLiked } from "./HelperFunctions";

export const setFilter = (value: String, data: any) => {
  if (value === "ORDERASC") {
    const sortedData: Testimonial[] = [...data].sort(
      (a, b) => a.ratings - b.ratings
    );
    return sortedData;
  } else if (value === "ORDERDESC") {
    const sortedData: Testimonial[] = [...data].sort(
      (a, b) => b.ratings - a.ratings
    );
    return sortedData;
  } else if (value === "FAVORITE"){
    const localLikes = JSON.parse(getLiked() || "{}");
    const favs = Object.entries(localLikes).filter(([key, value]) => value === true).map(([key]) => key);
    const favData = [...data].filter((item) => favs.includes(item._id));
    return favData;
  }
  return data;
};
