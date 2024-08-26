import { useEffect, useState } from "react";
import "./Profile.css";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_MUTATION } from "../graphql/mutations";
import { PROFILE_QUERY } from "../graphql/query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../state/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { RiExternalLinkLine } from "react-icons/ri";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading } = useQuery(PROFILE_QUERY);

  const [profileData, setProfileData] = useState({
    company_name: "",
    website: "",
    desc: "",
    service: "",
  });

  useEffect(() => {
    if (data && data.profile && data.profile.company) {
      setProfileData({
        company_name: data.profile.company.company_name,
        website: data.profile.company.website,
        desc: data.profile.company.desc,
        service: data.profile.company.service,
      });
    }
  }, [data]);

  const [update] = useMutation(UPDATE_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await update({
        variables: {
          company_name: profileData.company_name,
          website: profileData.website,
          desc: profileData.desc,
          service: profileData.service,
        },
        onCompleted: () => {
          toast.success("Profile Successfully Updated! 😊");
        },
      });
    } catch (err) {
      toast.error("Sorry! It did not work this time 😓");
      console.log("Error while Updating Data", err);
    }
  };

  const logout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  if (loading) {
    return <div className="progressBar"></div>;
  }

  return (
    <div className="profile_container">
      <Toaster />

      <div className="first_home">
        <h2 className="home_h2">Profile</h2>

        {data.profile.username && (
          <div className="home_div_link">
            <span
              className="home_link"
              onClick={() =>
                window.open(
                  `http://localhost:3000/company/${data.profile.username}`
                )
              }
            >
              localhost:3000/company/{data.profile.username}
              <RiExternalLinkLine className="icon" size={20} />
            </span>
          </div>
        )}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="label">Company Name</label>
          </div>
          <div>
            <input
              className="profile_input"
              type="text"
              placeholder="Enter your company name"
              value={profileData.company_name}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  company_name: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label className="label">Website</label>
          </div>
          <div>
            <input
              className="profile_input"
              type="string"
              placeholder="www.companywebsite.com"
              value={profileData.website}
              onChange={(e) =>
                setProfileData({ ...profileData, website: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label className="label">About the company</label>
          </div>
          <div>
            <textarea
              className="profile_textarea"
              placeholder="Tell users about your company values and innovations"
              value={profileData.desc}
              onChange={(e) =>
                setProfileData({ ...profileData, desc: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div>
            <label className="label">Provided Services</label>
          </div>
          <div>
            <input
              className="profile_input"
              type="string"
              placeholder="How was your experience with our first AI product?"
              value={profileData.service}
              onChange={(e) =>
                setProfileData({ ...profileData, service: e.target.value })
              }
            />
          </div>
        </div>

        <div className="button_container">
          <button type="submit" className="save">
            Save Changes
          </button>

          <button className="logout" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
