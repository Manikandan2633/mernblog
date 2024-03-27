import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import "./Register.css";
import axios from "axios";
import { BACKEND_URL} from '../url';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleRegister =async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.post(BACKEND_URL+"api/auth/register",{name,email,password});
      setName(res.data.name);
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false);
      navigate('/login');
    }catch(err){
      setError(true);
      console.log(err)
    }
  } 
  return (
    <div className="register" onSubmit={handleRegister}>
      <h4>Create a Account.. </h4>
      <form>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
        {error && <h3>Registration failed</h3>}
        <p>
          Already Have an account !{" "}
          <Link to="/login" element={<Login />}>
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
