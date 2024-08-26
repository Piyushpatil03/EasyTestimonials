import { useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { registerSuccess } from "../state/auth/authSlice";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../graphql/mutations";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [register, { loading ,error }] = useMutation(SIGNUP_MUTATION)
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await register({
      variables : {
        name : registerData.name,
        email : registerData.email,
        password : registerData.password
      }
    })

    dispatch(registerSuccess({ authToken : data.Signup.token }))
    navigate("/")
  };

  return (
    <div className="container">
      <h2 className="title">Create an Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="label">Name</label>
          </div>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Enter your full name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label className="label">Email ID</label>
          </div>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Enter your email address"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
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
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        <button type="submit" className="submit_button">
          Register
        </button>

        <div className="no_account">
          Already have an Account?&nbsp;
          <Link to="/login" className="register_link">
            Login Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
