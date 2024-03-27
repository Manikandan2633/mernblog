import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import axios from "axios";
import { BACKEND_URL } from "../url";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loader,setLoader]=useState(false)
  const [error,setError]=useState(false)
  
  // console.log(posts);
  useEffect(() => {
    const timeout = setTimeout(()=>{
      setError(true)
      setLoader(false);
    },10000)

    
    const fetchPosts = async () => {
      setLoader(true)
      try {
        const res = await axios.get(BACKEND_URL + "api/posts/all");
        // console.log(res.data);
        setPosts(res.data);
        setLoader(false)
        clearTimeout(timeout)
      } catch (error) {
        setLoader(true)
        console.log(error);
      }
    };

    fetchPosts();
    return ()=> clearTimeout(timeout);
  }, []);
  return (
      <div>
        {error ? (<Error/>):
        !loader ? posts.map(post => (
          <HomePosts key={post._id} post={post} />
        )) : <Loader />}
      </div>
  );
};

export default Home;
