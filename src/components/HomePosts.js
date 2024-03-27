import React, { useContext, useEffect, useState } from "react";
import "./HomePosts.css";
import { BACKEND_URL } from "../url";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const HomePosts = ({ post }) => {
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
  useEffect(()=>{
    if(user){
      setUserId(user.id)
    }
  },[])
  console.log(user);
  if (!post) {
    return null;
  }
  return (
    <Link
      to={`/posts/post/${post._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="post-container">
        <div className="content">
          <div className="post-image-container">
            <img
              src={`${BACKEND_URL}images/${post.photo}`}
              alt=""
              className="post-image"
            />
          </div>
          <div className="post-content">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-details">
              <p className="post-username">{post.username}</p>
              <div className="post-date">
                <p>
                  {post.updatedAt.slice(0, 10)} | {post.updatedAt.slice(11, 16)}
                </p>
              </div>
            </div>
            <p
              className="post-description"
              dangerouslySetInnerHTML={{
                __html: post.description.slice(0, 200) + "   ...Read more",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomePosts;
