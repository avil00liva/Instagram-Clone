/* eslint-disable react-hooks/exhaustive-deps */
import { collection, collectionGroup, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiFillLock, AiOutlineUser } from "react-icons/ai"
import { db } from '../firebase'
import ProfilePostCard from './ProfilePostCard'

const ProfilePosts = ({iduser}) => {
    const [clickedVUpload, setClickedVUpload]=useState(true)
    const [clickedVLiked, setClickedVLiked]=useState(false)
    const [posts, setPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([])

    const handleVUClicked = ()=>{
        setClickedVUpload(true)
        setClickedVLiked(false)
    }
    const handleVLClicked = ()=>{
        setClickedVLiked(true)
        setClickedVUpload(false)
    }


    useEffect( ()=>{
        const getPost = async ()=> { onSnapshot(
          query(collection(db, "posts"), where("iduser", "==" , iduser) ,orderBy("timestamp", "desc")),
          (snapshot)=>{
            setPosts(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
          }
          )}
          getPost()
        }, [])

    useEffect( ()=>{
        const getSavedPost = async ()=> { onSnapshot(
          query(collectionGroup(db, "saves"), where("savedBy", "==" , iduser) ,orderBy("timestamp", "desc")),
          (snapshot)=>{
            setSavedPosts(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
          }
          )}
          getSavedPost()
        }, [])

  return (
    <div className='w-full quini:min-w-[520px] min-h-[500px]'>
        <div className='w-full h-[50px] dark:bg-black bg-inherit flex items-center border-b quini:border-gray-300 border-gray-600'>
            <div className={clickedVUpload ? 'flex-[0.5] text-center py-4 quini:py-2 cursor-pointer transition-colors duration-300 quini:hover:bg-gray-100 quini:rounded-md quini:text-black dark:text-gray-200 text-gray-700 border-b border-gray-800 dark:border-gray-200 quini:border-0 leading-[15px]' : 'flex-[0.5] text-center py-2 cursor-pointer transition-colors duration-300 quini:hover:bg-gray-100 quini:rounded-md text-gray-800 dark:text-gray-500'} onClick={handleVUClicked}>
                <h2 className='font-bold flex items-center justify-center'>
                    Posts
                </h2>
            </div>
            <div className={clickedVLiked ? 'flex-[0.5] text-center py-4 quini:py-2 cursor-pointer transition-colors duration-300 quini:hover:bg-gray-100 text-gray-700 dark:text-gray-200 quini:text-black quini:rounded-md border-b border-gray-800 dark:border-gray-200 quini:border-0' : 'flex-[0.5] text-center py-2 cursor-pointer transition-colors duration-300 quini:hover:bg-gray-100 quini:rounded-md text-gray-800 dark:text-gray-500'} onClick={handleVLClicked}>
                <h2 className='hidden font-bold quini:flex items-center justify-center'> <AiFillLock className='mr-1' /> 
                    Has sido etiquetado
                </h2>
                <h2 className='quini:hidden font-bold flex items-center justify-center'>        
                    <AiFillHeart className='mr-1' /> 
                </h2>
            </div>
        </div>

        {
            clickedVUpload 
            ?
                <>
                {posts.length === 0 ? 
                    <div className='w-full min-h-[500px] bg-[#ddd] dark:bg-black quini:bg-white flex items-center justify-center mt-[50px] quini:mt-0'>
                        <div className='flex flex-col items-center justify-center text-center m-auto'>
                            <span className='mb-[10px] dark:text-gray-200 text-gray-700'>
                                <AiOutlineUser className=' w-[120px] h-[120px]' />
                            </span>
                            <p className='block mt-[0.5em] dark:text-gray-200 text-black  font-bold'>Upload a photo ❤</p>
                            <p className='block mt-[0.5em] dark:text-gray-200 text-black '>Your posts aprears here!</p>
                        </div> 
                    </div>
                        :
                        <div className='w-full min-h-[500px] text-black dark:text-white bg-inherit dark:bg-black quini:bg-white flex flex-wrap py-4 justify-start items-start'>
                            {posts.map((post, index)=>{
                                return (
                                    <ProfilePostCard key={index} post={post} />
                                )
                            })}
                        </div> 
                
                }
                </>
            :
            <>
            {savedPosts.length === 0 ?
                <div className='w-full min-h-[500px] dark:bg-black bg-inherit flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center text-center m-auto'>
                        <span className='mb-[10px] text-gray-700 dark:text-gray-200'>
                            <AiOutlineUser className=' w-[120px] h-[120px]' />
                        </span>
                        <p className='block mt-[0.5em] text-black dark:text-gray-200 font-bold'>Aún no hay videos que hayan recibido me gusta</p>
                        <p className='block mt-[0.5em] text-black dark:text-gray-200'>Aquí aparecerán los videos que te hayan gustado</p>
                    </div>
                </div>
                :
                <div className='w-full min-h-[500px] text-black dark:text-white bg-inherit dark:bg-black quini:bg-white flex flex-wrap py-4 justify-start items-start'>
                    {savedPosts.map((post, index)=>{
                        return (
                            <ProfilePostCard key={index} post={post} />
                        )
                    })}
                </div> 
            }
            </>
           }
    </div>
  )
}

export default ProfilePosts