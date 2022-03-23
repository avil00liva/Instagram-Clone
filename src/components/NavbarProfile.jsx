import React from 'react';
import { CgAddR } from "react-icons/cg"
import { FaBars } from "react-icons/fa"
import { usePosts } from '../context/PostsContext';

const Navbar = ({username}) => {
  const { showUploadPhotoMenu, showUserSetting } = usePosts()


  return <nav className='z-10 w-full text-black dark:text-white h-14 bg-[#ddd] dark:bg-black dark:border-b-gray-200 border-b border-b-gray-600 px-2 flex justify-between items-center fixed top-0 left-0'>
    <span className='flex items-center h-full cursor-pointer flex-[0.5] quini:flex-[0.3] text-2xl font-bold dark:text-white'>
      {username?.split(" ").join("").toLocaleLowerCase()}
    </span>
    <ul className='list-none flex gap-4 text-black dark:text-white'>
        <li title="Añadir foto" className="cursor-pointer" onClick={showUploadPhotoMenu}>
          <CgAddR className='w-7 h-7 font-bold' />
        </li>
        <li title="Notificaciones" className="cursor-pointer" onClick={showUserSetting}>
          <FaBars className='w-7 h-7 font-bold' />
        </li>
    </ul>
  </nav>;
};

export default Navbar;
