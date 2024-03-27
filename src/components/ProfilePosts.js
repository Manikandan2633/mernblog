import React from 'react'
import "./HomePosts.css";



const ProfilePosts = () => {
  return (
    <div className="post-container">
      <div className="post-image-container">
        <img
          src="https://miro.medium.com/v2/resize:fit:679/format:webp/1*-gg9OfEwhNG9a2m8e6ijdA.jpeg"
          alt=""
          className="post-image"
        />
      </div>
      <div className="post-content">
        <h1 className="post-title">Artificial Intelligence</h1>
        <div className="post-details">
          <p className="post-username">mani</p>
          <div className="post-date">
            <p>8/3/2024 | 12.00 PM</p>
          </div>
        </div>
        <p className="post-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro in rem,
          provident impedit cumque, vel assumenda veniam repellat voluptatum
          dolorem temporibus. Cumque quas, deleniti officiis magni molestiae
          velit! Nostrum, repellendus!
        </p>
      </div>
    </div>
  )
}

export default ProfilePosts