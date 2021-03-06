import React from 'react'
import { BsSearch } from "react-icons/bs"
import { MdOutlineVideoLibrary } from "react-icons/md"
import { FiShoppingBag } from "react-icons/fi"
import { VscHome } from "react-icons/vsc"
import avatar from "../assets/images/cat.jpg"
import { usePosts } from '../context/PostsContext'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

const NavbarBottom = () => {
    const { isAuth } = usePosts()
    const authUserAvatar = auth?.currentUser?.photoURL
    const authUserId = auth?.currentUser?.uid

  return (
    <nav className='z-10 w-full h-[50px] bg-[#ddd] dark:bg-black dark:text-white border-t border-t-gray-600 px-2 flex justify-between items-center fixed bottom-0 left-0'>
        <ul className='list-none flex justify-between px-2 items-center w-full h-full'>
            <li title="Home">
                <Link to="/">
                    <VscHome className='w-7 h-7 font-bold transition-opacity duration-300 hover:opacity-70' />
                </Link>
            </li>
            <li title="Feed">
                <Link to="/explore">
                    <BsSearch className='w-6 h-6 font-bold transition-opacity duration-300 hover:opacity-70' />
                </Link>
            </li>
            <li title="Rell">
                <Link to="/rell">
                    <MdOutlineVideoLibrary className='w-6 h-6 font-bold transition-opacity duration-300 hover:opacity-70' />
                </Link>
            </li>
            <li title="Shop">
                <FiShoppingBag className='w-6 h-6 font-bold transition-opacity duration-300 hover:opacity-70' />
            </li>
            <li title="Profile">
                <Link to={`/profile/${authUserId}`}>
                    <div className='w-7 h-7 rounded-full overflow-hidden border-2 border-red-500'>
                        <img src={isAuth ? authUserAvatar : avatar} onError={(event) => event.target.style.display = 'none'} alt="Avatar profile" className='w-full h-full object-cover' />
                    </div>
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavbarBottom