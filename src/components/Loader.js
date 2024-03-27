import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import './Loader.css'
const Loader = () => {
  return (
    <div className="loader">
    <p>Loading Data...</p>
    <FaSpinner icon="spinner" className="spinner" />
  </div>
  )
}

export default Loader