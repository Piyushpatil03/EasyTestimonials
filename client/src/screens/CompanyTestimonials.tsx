import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { COMPANY_QUERY } from "../graphql/query";
import "./CompanyTestimonials.css";
import { FiExternalLink } from "react-icons/fi";
import TestimonialForm from "../components/TestimonialForm";

const CompanyTestimonials = () => {
  const { username } = useParams();
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { username },
  });

  return (
    <>
      {data && data.comp && data.comp.company && (
        <div>
          <div className="first_container">
            <img
              src="https://picsum.photos/seed/picsum/100/100"
              className="company_image_2"
            />
            <h2 className="h2_test">{data.comp.company.company_name}</h2>
            <Link to={`/${data.comp.company.website}`} className="link_test">
              <FiExternalLink size={15} className="link_logo" />
              {data.comp.company.website}
            </Link>
          </div>

          <div className="second_container">
            <div className="left_div">
              <h2 className="about_text">About Us</h2>
            </div>

            <div className="right_div">
              <p className="info_text">{data.comp.company.desc}</p>
            </div>
          </div>

          
          <div className="third_container">
            <div className="left_div">
              <h2 className="about_text">Feedback</h2>
            </div>

            <div className="right_div">
              <h2 className="service_text">{data.comp.company.service}</h2>
              <TestimonialForm username = { username }/>
            </div>
          </div>


        </div>
      )}
    </>
  );
};

export default CompanyTestimonials;
