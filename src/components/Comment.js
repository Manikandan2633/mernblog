import React, { useContext } from 'react'
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import { BACKEND_URL } from '../url'
import axios from 'axios'

const Comment = ({message,userid}) => {
  // console.log(message)
  const {user} = useContext(UserContext);
const handleDelete = async() =>{
  const res = await axios.delete(`${BACKEND_URL}api/comment/${message._id}`)
  if(res.ok){
    alert("comment deleted");
  }
}
  return (
    <div className="comment-name">
          <div className="comment-author">
            <div className="comment-time">
              <ul style={{ listStyle: "none" }}>
                <li>{message.author}</li>
                <li>{message.updatedAt.slice(0,10)} | {message.updatedAt.slice(11,16)} </li>
              </ul>
            </div> 
            {userid === message.userId  ? 
            <div className="comment-edit">
              <p onClick={handleDelete}>
                <MdDelete />
              </p>
            </div> 
            : ""}
          </div>
          <div className="comment-info">
            <p>{message.comment}</p>
          </div>
        </div>
  )
}

export default Comment