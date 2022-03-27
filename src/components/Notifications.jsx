/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import logo from "../assets/images/hummingbird.png"
import { IoIosArrowDown } from "react-icons/io"
import { auth, db } from "../firebase"
import { collection, collectionGroup, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { usePosts } from '../context/PostsContext'


const Notifications = () => {
  const {posts, isAuth, notifications, setNotifications} = usePosts()
  const [likesDoc, setLikesDoc] = useState([])
  const [followUser, setFollowUser] = useState([])
  const [comments, setComments] = useState([])
  const username = auth?.currentUser?.displayName?.split(" ").join("").toLocaleLowerCase();
  const [postsFiltrados, setPostsFiltrados] = useState([])
  const userID = auth?.currentUser?.uid
  const today = new Date()
  const hora = today.getHours() + ":" + today.getMinutes();

  useEffect(()=>{
    const postFiltrado = posts.filter(post => post?.iduser === userID)
    setPostsFiltrados(postFiltrado)
  },[])

  useEffect(()=>{
    const commentsDb = async ()=> { onSnapshot(
      query(collectionGroup(db, "comments"), where("postId", "==", !userID ? "" : userID)),
      (snapshot)=>{
        setComments(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
      }
    )}
    commentsDb()
  },[userID])

  useEffect(()=>{
    const likesDb = async ()=> { onSnapshot(
      query(collectionGroup(db, "likes"), where("postId", "==", !userID ? "" : userID), orderBy("timestamp", "desc"), limit(4)),
      (snapshot)=>{
        setLikesDoc(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
      }
    )}
    likesDb()
  },[userID, db])
  useEffect(
    () =>{ 
     const usersDb = async ()=> {onSnapshot(query(collection(db, "usuarios", !userID ? "0" : userID, "followers"), orderBy("timestamp", "desc"), limit(4)), 
     (snapshot) =>{
       setFollowUser(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
      }
      )}
      usersDb()
    },
    [userID]
  );

  return (
    <>
    {isAuth
      ? 
      <div className={notifications ? 'w-full min-h-screen bg-black inset-0 z-[180] overflow-y-auto text-white flex items-center flex-col fixed' : 'hidden'}>
        <nav className='min-h-[30px] w-full flex mb-4 items-center justify-between p-2 py-3 fixed top-0 left-0 bg-black z-[21]'>
          <span className='w-[30px] h-full rounded-full ml-1'>
              <img src={logo} alt="Logo App" className='w-full h-full rounded-full' />
          </span>
          <span className='text-white font-bold text-lg flex items-center gap-1 cursor-pointer' onClick={()=>{setNotifications(false)}}>
            {username} <IoIosArrowDown className='text-white font-bold w-[22px] h-[22px]' /> 
          </span>
          <span></span>
        </nav>
        <div className='absolute min-h-[100px] mt-10 pt-8 w-full border-b border-transparent flex flex-col items-center text-white'>

          <h1 className='font-bold text-center'>Me gusta</h1>
          <div className='relative bg-transparent w-full min-h-[150px] pb-8 border-b border-gray-500 mb-4'>
            {likesDoc?.map((like,index)=>{
              return (
                <div className='w-full min-h-[60px] my-4 flex items-center px-3 pb-2 justify-between' key={index}>
                  <div className='w-full h-full flex items-center gap-2'>
                    <img src={like?.userImg} alt="User avatar" className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col justify-self-start'>
                        <span className='font-bold'>{like?.username}</span>
                        <span>ha dicho que le gusta tu post</span>
                    </div>
                  </div>
                  <span className='text-gray-400 text-sm self-end'>
                    {hora}
                  </span>
                </div>
              )
            })}
          </div>

          <h1 className='font-bold text-center'>Seguidores</h1>
          <div className='relative bg-transparent w-full min-h-[100px] pb-8 border-b border-gray-500 mb-4'>
            {followUser?.map((follow,index)=> {
              return (
                <div className='w-full min-h-[60px] my-4 flex items-center px-3 justify-between' key={index}>
                  <div className='w-full h-full flex items-center gap-2'>
                    <img src={follow?.userImg} alt="User avatar" className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col justify-self-start'>
                        <span className='font-bold'>{follow?.username}</span>
                        <span>empezó a seguirte.</span>
                    </div>
                  </div>
                  <span className='text-gray-400 text-sm self-end'>
                    {hora}
                  </span>
                </div>
              )
            })}
          </div>

          <h1 className='font-bold text-center'>Comentarios</h1>
          <div className='relative bg-transparent w-full min-h-[100px] pb-8 border-b border-gray-500 mb-4'>
            {comments.map((comment, index)=> {
              return (
                <div className='w-full min-h-[60px] my-4 flex items-center px-3 justify-between' key={index}>
                  <div className='w-full h-full flex items-center gap-2 flex-[0.9]'>
                    <img src={comment?.userImg} alt="User avatar" className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col justify-self-start'>
                        <span className='font-bold'>{comment?.username}</span>
                        <p className='leading-[22px] whitespace-pre-line break-all mb-[6px]'>
                          <span>
                            ha comentado: {comment?.comment}
                          </span>
                        </p>
                    </div>
                  </div>
                  <span className='text-gray-400 text-sm self-end'>
                    {hora}
                  </span>
                </div>
              )
            })}
          </div>


        </div>
      </div> 
      :
      ""
    }
    </>
    );
};

export default Notifications