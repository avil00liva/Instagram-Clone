import React from 'react'
import { IoMdClose } from "react-icons/io"
import { Link } from 'react-router-dom'

const FullStories = ({src, description, userImg, username, iduser, id, setFullStorie, fullStorie}) => {

  const showStorie = ()=>{
    setFullStorie(false)
  }

  return (
      <>
        {fullStorie &&
            <div className='w-full pt-2 min-h-screen overflow-y-auto bg-[#ddd] dark:bg-black dark:text-white fixed inset-0 z-50'>
              <img src={src} alt="Storie post" className='w-full h-full object-cover absolute top-0 left-0'  />
              <div className='w-full min-h-[30px] z-50 relative px-2 flex items-center justify-between'>
                <Link to={`/profile/${iduser}`}>
                  <div className='flex items-center justify-start'>
                    <img src={userImg} alt="User avatar" className='w-[40px] h-[40px] rounded-full' />
                    <div className='ml-2'>
                      <h3 className='text-gray-200'>{username}</h3>
                      <h4 className='text-gray-300'>{description}</h4>
                    </div>
                  </div>
                </Link>
                <IoMdClose className='relative z-50 w-8 h-8 text-white' onClick={showStorie}/>
              </div>
            </div>
        }
      </>
  )
}

export default FullStories