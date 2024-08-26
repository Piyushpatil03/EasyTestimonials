import { useMutation, useQuery } from "@apollo/client";
import "./Testimonials.css";
import { SEARCH_QUERY, TESTIMONIAL_QUERY } from "../graphql/query";
import TestimonialCard from "../components/TestimonialCard";
import Filters from "../components/Filters";
import { useCallback, useEffect, useState } from "react";
import { getLiked, setLiked } from "../utils/HelperFunctions";
import { LIKED_MUTATION } from "../graphql/mutations";
import { setFilter } from "../utils/FilterFunctions";
import toast, { Toaster } from "react-hot-toast";
import Search from "../components/Search";
import debounce from "lodash.debounce";

export interface Testimonial {
  _id: string;
  customer_name: string;
  complete_testimonial: string;
  short_testimonial: string;
  org_name: string;
  ratings: number;
  isLiked: boolean;
}

const Testimonials = () => {
  const { data, loading, error } = useQuery(TESTIMONIAL_QUERY);
  const [likedMutation] = useMutation(LIKED_MUTATION);

  const [stateData, setStateData] = useState<Testimonial[]>([]);
  const [actions, setActions] = useState<Record<string, boolean>>({}); // dictionary to O(1) lookup and update the likes and dislikes
  const [value, setValue] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  const handleLike = (userId: string) => {
    setActions((prevActions) => {
      const updatedActions = { ...prevActions, [userId]: true };

      // check if the total likes are greater than 6 or not
      const trueCount = Object.values(updatedActions).filter(
        (value) => value === true
      ).length;
      if (trueCount > 6) {
        toast.error(
          "Already 6 testimonials added to the Favorites! Go for premium plan if you want to display more testimonials in your website."
        );
        return prevActions;
      } else {
        setLiked(JSON.stringify(updatedActions)); // stored in localstorage
        return updatedActions;
      }
    });
  };

  const handleDislike = (userId: string) => {
    setActions((prevActions) => {
      const updatedActions = { ...prevActions, [userId]: false };
      setLiked(JSON.stringify(updatedActions)); // stored in localstorage
      return updatedActions;
    });
  };

  // Optimization to not re-render the interval everytime
  const sendActionsToServer = useCallback(() => {
    const localLikes = JSON.parse(getLiked() || "[]");

    if (localLikes.length !== 0 && data && data.testi) {
      const actionsToSend: {} = Object.entries(localLikes).map(
        ([id, isLiked]) => ({
          _id: id,
          isLiked: isLiked,
        })
      );

      likedMutation({
        variables: {
          username: data.testi.username,
          actions: actionsToSend,
        },
      })
        .then((response) => {
          console.log("Updated testimonials:", response.data.addLikes.success);
        })
        .catch((error) => {
          console.error("Error updating testimonials:", error);
        });
    }
  }, [data]);

  useEffect(() => {
    if (!data || !data.testi) return;

    // after every 10 seconds, check if the localstorage has liked activity and update that in the database
    const intervalId = setInterval(sendActionsToServer, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data, sendActionsToServer]);

  // setActions[] of likes and dislikes to maintain consistency in database and localstorage (data will change after user inputs)
  useEffect(() => {
    if (data && data.testi && data.testi.testimonials) {
      const initialActions = data.testi.testimonials.reduce(
        (acc: Record<string, boolean>, item: any) => {
          acc[item._id] = item.isLiked;
          return acc;
        },
        {}
      );
      setActions(initialActions);
    }
  }, [data]);

  // Applying filters on the data and set new Data
  useEffect(() => {
    if (data && data.testi) {
      const newData = setFilter(value, data.testi.testimonials);
      setStateData(newData);
    }
  }, [value, data]);

  // Search query - Debounced request (Optimization)
  const searchData = useQuery(SEARCH_QUERY, {
    variables: { searchTerm : debouncedTerm },
    onCompleted: (searchData) => {
      setStateData(searchData.search);
      console.log("SEARCHED", searchData.search);
    },
  });

  const handleSearch = useCallback(
    debounce((term) => {
      setDebouncedTerm(term);
    }, 500),
    []
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  if (loading) {
    return <div className="progressBar"></div>;
  }

  return (
    <div className="test_container">
      <Toaster />
      <h2 className="head_test">Testimonials and Ratings</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {stateData && (
        <div style={{ display: "flex" }}>
          <div style={{ width: "30%" }}>
            <Filters value={value} setValue={setValue} />
          </div>

          <div style={{ width: "70%" }}>
            {stateData.map((item: any, index: number) => (
              <TestimonialCard
                key={index}
                item={item}
                handleLike={handleLike}
                handleDislike={handleDislike}
                likedOption={actions[item._id]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
