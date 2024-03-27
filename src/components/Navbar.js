import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BACKEND_URL } from "../url";


const Navbar = () => {
  const {user} = useContext(UserContext);
  // console.log(user.name)
  const {setUser} = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const handlelogout = async()=>{
    try {
      const res = await axios.get(BACKEND_URL+"api/auth/logout",{withCredentials:true})
      setUser(null);
    } catch (error) {
      
    }
  }
  return (
    <div className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        <h1>Freedium</h1>
      </Link>
      <div className="search">
        <input type="text" placeholder="searh here.." />
        <p>
          <BsSearch />
        </p>
      </div>
      <div className="auth">
        <h3>
          {user ? (
            <Link to="/write">
              Write
            </Link>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}
        </h3>
        <h3>
          {user ? (
            // <Link to="/profile" style={{ textDecoration: "none" }}>
            //   Profile
            // </Link>
            <div className="profile-dropdown">
            <div className="avatar" onClick={() => setShowDropdown(!showDropdown)}>
              <FaRegUserCircle style={{fontSize:"25px",marginTop:"5px"}} />
            </div>
            {showDropdown && (
              <div className="dropdown-content" >
                <p>{user.name}</p>
                <Link  className="button" onClick={handlelogout}>Logout</Link>
                {/* <button >Logout</button> */}
              </div>
            )}
          </div>
          ) : (
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          )}
        </h3>
      </div>
    </div>
  );
};

export default Navbar;
