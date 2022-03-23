/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { AiOutlineHeart, AiFillHeart, AiOutlineInbox } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { FiSend } from "react-icons/fi"
import { usePosts } from '../context/PostsContext'
import { auth, db } from '../firebase'
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'

const ProfileFullPost = ({id, description,src, userImg, username, profileFullPost, setProfileFullPost, iduser}) => {
    const {isAuth, signInWithGoogle} = usePosts()
    const [liked, setLiked] = useState(false)
    const [likesDoc, setLikesDoc] = useState([])


    useEffect(
        () =>{
          onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikesDoc(snapshot.docs)
        )             
        },[db, id]
    );

    useEffect(()=>{
        setLiked(likesDoc.findIndex((like)=> like.id === auth?.currentUser?.uid) !== -1)
    },[likesDoc])


    const likePost = async ()=> {
        if(isAuth){
            if(liked){
                await deleteDoc(doc(db, "posts",id,"likes", auth?.currentUser?.uid))
            } else {
                await setDoc(doc(db, "posts",id,"likes", auth?.currentUser?.uid), {
                    username: auth.currentUser.displayName.split(" ").join("").toLocaleLowerCase(),
                    iduser: auth.currentUser.uid,
                    postId: iduser,
                    userImg: auth.currentUser.photoURL,
                    timestamp: serverTimestamp()             
                })
            }}
        else {
            return signInWithGoogle()
        }
    }

  return (
    <>
    {profileFullPost &&
        <div className='w-full min-h-screen overflow-y-auto bg-[#ddd] fixed inset-0 z-50'>
            <div onClick={()=>setProfileFullPost(false)} className="w-full bg-inherit dark:bg-black uppercase flex text-2xl items-center font-bold py-4 border-b border-b-gray-800 dark:border-b-gray-200 px-2">
                <IoArrowBack className='mr-2 w-7 h-7' />
                Posts
            </div>
            <div className='m-auto pb-4 pt-2 mb-8 w-full max-w-[500px] min-h-[500px] h-full bg-[#eee] dark:bg-gray-900 shadow-md relative dark:text-white'>
                <div className='w-full min-h-[50px] flex items-center justify-between px-2 py-2'>
                    <div className='flex items-center h-full'>
                        <span className='w-10 h-10 border border-[#f20069] rounded-full overflow-hidden cursor-pointer'>
                            <img src={userImg} alt="Avatar user" onError={(event) => event.target.style.display = 'none'} className='w-full h-full object-cover'/>
                        </span>
                        <p className="ml-2 font-bold text-gray-700 dark:text-gray-200">
                            {username}
                        </p>
                    </div>
                </div>
                <div className='w-full min-h-[350px] bg-transparent'>
                    <img src={src} alt="Post" className='w-full h-full'/>
                </div>
                <div className='w-full min-h-[50px] dark:text-white bg-inherit dark:bg-black flex justify-between items-center px-2 pt-4 pb-2 border-0'>
                    <div className="flex items-center">
                        <span className='mr-[9px] cursor-pointer' onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                            }}>
                            {liked 
                                ?
                                <AiFillHeart className="w-8 h-8 font-bold cursor-pointer text-red-600" />
                                :
                                <AiOutlineHeart className="w-8 h-8 font-bold cursor-pointer" />
                            }
                        </span>
                        <span className='mr-[9px] cursor-pointer'>
                            <FaRegComment className="w-7 h-7 font-bold cursor-pointer" />
                        </span>
                        <span className='mr-[5px] cursor-pointer'>
                            <FiSend className="w-7 h-7 font-bold cursor-pointer" />
                        </span>
                    </div>
                    <div>
                        <span className='cursor-pointer'>
                            <AiOutlineInbox className='w-8 h-8 font-bold cursor-pointer' />
                        </span>
                    </div>
                </div>
                <div className='w-full min-h-[30px] border-0 px-2 py-4 bg-inherit dark:bg-black'>
                    {likesDoc.length > 0 && <p className='font-bold mb-2'>{likesDoc.length} Likes</p>}
                    <p className='mb-2 text-gray-800 dark:text-gray-200'>
                        <span className='font-bold text-black dark:text-white'>{username} </span>
                        {description}
                    </p>
                    <p className='uppercase text-[#aaa] text-[10px] font-bold'>21 de Enero de 2022</p>
                </div>
                <div className='w-full min-h-[50px] p-2 flex flex-row gap-[5px] bg-inherit dark:bg-black dark:text-white pb-8'>
                    <span className='text-[1.3rem] cursor-pointer transition-opacity duration-300 hover:opacity-80'>😊</span>
                    <input type="text" placeholder='Añade un comentario...' className='w-full outline-none border-0 border-transparent bg-transparent border-b border-b-gray-800 dark:border-b-gray-200 rounded-b-md pb-2' />
                </div>
            </div>
        </div>
    }
</>
  )
}

export default ProfileFullPost