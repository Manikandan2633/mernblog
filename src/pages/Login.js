import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import "./Login.css";
import { BACKEND_URL } from "../url";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
    try {
      const res = await axios.post(BACKEND_URL + "api/auth/login", {
        email,
        password,
      },{withCredentials:true});
      setUser(res.data);
      navigate("/");
    } catch (error) {
      console.log("login failed");
    }
  };
  return (
    <div className="login">
      <h4>Login to your Account..</h4>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Your Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        <p>
          Don't have an account ?
          <Link to="/register" element={<Register />}>
            create One
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
