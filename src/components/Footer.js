import React from 'react'
import './Footer.css'
const Footer = () => {
  const date = new Date();
  return (
    <div className='footer'>
      <h4>All Rights Reserved &copy; {date.getFullYear()}</h4>
    </div>
  )
}

export default Footer