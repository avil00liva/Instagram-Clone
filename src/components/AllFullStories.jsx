import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io"
import { Link } from 'react-router-dom'
import { usePosts } from '../context/PostsContext'
import { auth, db } from '../firebase'
import {FaTrashAlt} from "react-icons/fa"
import { deleteDoc, doc } from 'firebase/firestore'
import loaderImg from "../assets/images/spiner.gif"

const AllFullStories = ({allFullStories, setAllFullStories, stories}) => {
    const [loaded, setLoaded] = useState(false)
    const { isAuth } = usePosts()
    const usuarioId = auth?.currentUser?.uid

    const showStorie = ()=>{
        setAllFullStories(false)
    }

    const loadComplete = ()=>{
        setLoaded(true)
    }

return (
    <>
    {allFullStories &&
        <div className='w-full min-h-screen bg-[#ddd] dark:bg-black dark:text-white fixed inset-0 scrolling-wrapper storie-scroll z-50 '>
          {stories.map((storie, index)=>{
              return (
                <div className='snap-start min-w-full min-h-screen relative card flex flex-col' key={index}>
                    {!loaded && <div className='flex items-center w-screen h-screen object-cover absolute top-0 left-0 z-[100] bg-gray-200'>
                        <img src={loaderImg} alt="Loader pic" className='w-auto h-auto' />
                    </div>}
                    <img src={storie.src} onLoad={loadComplete}  alt="User storie" className=' w-screen h-screen object-cover absolute top-0 left-0'/>
                    <div className='w-full min-h-[30px] z-50 relative px-2 flex items-center justify-between'>
                        <Link to={`/profile/${storie.iduser}`}>
                            <div className='flex items-center justify-start'>
                                <img src={storie.userImg} alt="User avatar" className='w-[40px] h-[40px] rounded-full' />
                                    <div className='ml-2'>
                                    <h3 className='text-gray-200'>{storie.username}</h3>
                                    <h4 className='text-gray-300'>{storie.description}</h4>
                                </div>
                            </div>
                        </Link>
                        <IoMdClose className='relative z-50 w-8 h-8 text-white' onClick={showStorie}/>
                    </div>
                    {isAuth && storie.iduser === usuarioId
                        ?
                        <div className='mt-4 ml-2 w-[50px] text-3xl cursor-pointer font-bold text-red-500 flex-[0.1] items-center dark:text-red-500 z-50 absolute bottom-8 left-4'>
                            <FaTrashAlt className="w-7 h-7 cursor-pointer font-bold text-red-500" onClick={(e) => {
                                e.stopPropagation()
                                deleteDoc(doc(db, "stories", storie.id))
                            }}/>
                        </div>
                        :
                        ""
                    }
                    
                </div>
              )
          })}
        </div>
    }
  </>
  )
}





export default AllFullStories