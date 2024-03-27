import React, { useContext, useEffect, useState } from "react";
import "./CreatePost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BACKEND_URL } from "../url";

const CreatePost = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  // console.log(user)
  const [userId, setUserId] = useState(null);
  useEffect(()=>{
    if(user){
      if(user._id === undefined){
        setUserId(user.id)
      }else{
        // console.log(user._id)
        setUserId(user._id)
      }
    }
  },[user])
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const handleCreatePost = async (e) => {
    e.preventDefault();
    // console.log(description);
    const newPost = {
      title: title,
      description: description,
      username: user.name,
      userId : userId
    };
    console.log(newPost)
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("img", filename);
      data.append("file", file);
      newPost.photo = filename;
      console.log(data)
      console.log(newPost)
      try {
        await axios.post(BACKEND_URL + "api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post(BACKEND_URL + "api/posts/write", newPost);

      //console.log(res.data)
      //  setUpdated(true)
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-post">
      <h3>Create your post...</h3>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            onChange={setDescription}
            modules={modules}
          />
          <button>create</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
