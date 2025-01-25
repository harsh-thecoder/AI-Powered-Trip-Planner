import React from 'react';
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <div className='my-7'>
      <div className='flex items-center justify-center space-x-2 text-gray-600'>
        <FaRegCopyright />
        <h2>Created by Harsh Pandey - Smart AI Trip Planner</h2>
      </div>
    </div>
  );
}

export default Footer;
