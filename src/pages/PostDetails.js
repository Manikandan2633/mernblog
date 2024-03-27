import React, { useContext, useEffect, useState } from "react";
import "./PostDetails.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../url";
import Loader from "../components/Loader";
import Error from "../components/Error";

const PostDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [post, setPost] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [error,setError] = useState(false);


  useEffect(() => {
    if (user) {
      if (user._id === undefined) {
        setUserId(user.id);
      } else {
        setUserId(user._id);
      }
    }
  }, [user]);


  

  const postId = useParams().id;
 

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setError(true);
      setLoader(false)
    },10000) // timeout after 10000 milliseconds


    const fetchPosts = async () => {
      setLoader(true);
      try {
        const res = await axios.get(BACKEND_URL + "api/posts/post/" + postId);
        // console.log(res)
        setPost(res.data);
        fetchComments();
        setLoader(false);
        clearTimeout(timeout); //clear timeout when data is loaded successfully
      } catch (error) {
        setLoader(true);
        console.log(error);
      }
    };

    fetchPosts();
    return ()=> clearTimeout(timeout); // Cleanup function to clear timeout on unmount
  }, [postId]);

  // const {title, username,updatedAt} = post;
  // console.log(title)
  const fetchComments = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "api/comment/post/" + post._id);
      // console.log(res.data)
      setCommentList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (post._id) {
      fetchComments();
    }
  }, [post]);
  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return navigate('/login')
    }
    const res = axios
      .post(BACKEND_URL + "api/comment/create", {
        comment: comment,
        author: user.name,
        postId: post._id,
        userId: userId,
      })
      .then((res) => {
        // console.log(res.data)
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeletePost = async () => {
    const res = await axios.delete(`${BACKEND_URL}api/posts/post/${post._id}`);
    console.log(res);
    navigate("/");
  };
  return (
    <>
    {error ? (<Error/>):
      !loader ? (
        <div className="post-container">
          <div>
            <div className="post-details">
              <h1 className="post-heading">{post.title}</h1>
              {user && userId === post.userId ? (
                <div className="edit-options">
                  <Link to={`/edit/${post._id}`} style={{ color: "black" }}>
                    <p>
                      <BiEdit />
                    </p>
                  </Link>
                  <p onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="author-details">
              <p>@{post.username} </p>
            </div>
            <img src={BACKEND_URL + "images/" + post.photo} alt="" />
            <p
              className="post-description"
              dangerouslySetInnerHTML={{
                __html: post.description,
              }}
            />
          </div>
          <div className="comment">
            <h3>comments : </h3>
            {commentList.map((message) => (
              <Comment key={message._id} message={message} userid={userId} />
            ))}
            <form onSubmit={handleComment}>
              <div className="write-comment">
                <input
                  type="text"
                  placeholder="Add yout thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button>Add comment</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PostDetails;
