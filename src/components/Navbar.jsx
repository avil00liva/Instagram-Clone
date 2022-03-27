import React from 'react';
import { CgAddR } from "react-icons/cg"
import { AiOutlineHeart } from "react-icons/ai"
import { FiSend } from "react-icons/fi"
import { usePosts } from '../context/PostsContext';

const Navbar = () => {
  const { showUploadPhotoMenu, darkTheme, showNotifications }= usePosts()

  return <nav className='z-10 w-full h-11 bg-[#ddd] dark:bg-black border-b dark:border-b-gray-200 border-b-gray-600 px-2 flex justify-between items-center fixed top-0 left-0 dark:text-white'>
    <span className='flex items-center h-full cursor-pointer flex-[0.5] quini:flex-[0.3]'>
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="InstagramLogo" className={darkTheme ? "imgNegative" : ""} />
    </span>
    <ul className='list-none flex'>
        <li title="Añadir foto" className="cursor-pointer mr-4" onClick={showUploadPhotoMenu}>
          <CgAddR className='w-7 h-7 font-bold' />
        </li>
        <li title="Notificaciones" className="hover:opacity-80 transition-opacity duration-300 mr-4" onClick={showNotifications}> 
          <AiOutlineHeart className='w-7 h-7 font-bold' />
        </li>
        <li title="MD" className="cursor-pointer">
          <FiSend className='w-7 h-7 font-bold' />
        </li>
    </ul>
  </nav>;
};

export default Navbar;
