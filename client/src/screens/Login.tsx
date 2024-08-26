import { Link } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { loginSuccess } from "../state/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Sending the login data - GraphQL Mutation
      const { data } = await login({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
        onCompleted: () => {

        },
      });
      // Setting the auth token - Redux store
      dispatch(loginSuccess({ authToken: data.Login.token }));
      navigate("/");
    } catch (err) {
      toast.error("Wrong Password!");

      console.log("Error while login", err);
    }
  };

  return (
    <div className="container">
      <Toaster/>
      <h2 className="title">Sign in to Testimonials</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="label">Email ID</label>
          </div>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Enter your email address"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div>
            <label className="label">Password</label>
          </div>
          <div>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
        </div>

        <button type="submit" className="submit_button">
          Login
        </button>

        <div className="no_account">
          Don't have an account yet?&nbsp;
          <Link to="/register" className="register_link">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
