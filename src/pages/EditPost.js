import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../url";
import Error from "../components/Error";
import Loader from "../components/Loader";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get post id from route params
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(""); // Separate state for existing description
  // const [updatedDescription, setUpdatedDescription] = useState(); // State to capture user's updated description
  const [existingPost, setExistingPost] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch existing post data
    const timeout = setTimeout(() => {
      setError(true);
      setLoader(false);
    }, 10000);

    const fetchPost = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${BACKEND_URL}api/posts/post/${id}`);
        setExistingPost(response.data);
        setTitle(response.data.title);
        setFile(response.data.photo);
        setDescription(response.data.description);
        setLoader(false);
        clearTimeout(timeout);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
    return () => clearTimeout(timeout);
  }, [id]);
  console.log("file is : " + file);
  const handleEditPost = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      description: description,
    };
    console.log(newPost);
    if (file) {
      const data = new FormData();
      const filename = file.name;
      // data.append("img", filename);
      // data.append("file", file);
      newPost.photo = filename;
      // console.log(data)
      try {
        await axios.post(BACKEND_URL + "api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        `${BACKEND_URL}api/posts/post/${id}`,
        newPost
      );
      console.log(newPost);
      //console.log(res.data)
      //  setUpdated(true)
      navigate("/");
    } catch (err) {
      console.log(err);
    }

    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('description', description); // Use updatedDescription instead of description
    // console.log("form is : "+ description);
    // console.log("formData is : "+ formData);
    // if (file) {
    //   formData.append('photo', file);
    // }

    // try {
    //   const response = await axios.put(`${BACKEND_URL}api/posts/post/${id}`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   console.log('Post updated successfully:', response.data);
    //   Optionally, redirect the user or show a success message
    // } catch (error) {
    //   console.error('Error updating post:', error);
    // }
  };
  // console.log(updatedDescription);
  // console.log(existingDescription);
  return (
    <>
      {error ? (
        <Error />
      ) : !loader ? (
        <div className="create-post">
          <h3>Edit your post...</h3>
          {existingPost && (
            <form onSubmit={handleEditPost}>
              <input
                type="text"
                placeholder="Enter Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <img
                src={`${BACKEND_URL}images/${existingPost.photo}`}
                value={file}
                alt="Post"
                style={{ width: "100px", height: "100px" }}
              />
              <input
                type="file"
                placeholder="choose image"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="text-editor">
                <ReactQuill
                  theme="snow"
                  placeholder="Enter post description"
                  value={description}
                  onChange={(newValue) => setDescription(newValue)}
                />{" "}
                {/* Use updatedDescription for user input */}
                <button type="submit">Update</button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditPost;
