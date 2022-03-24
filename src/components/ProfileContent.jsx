/* eslint-disable react-hooks/exhaustive-deps */
import { collection, collectionGroup, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { usePosts } from '../context/PostsContext'
import { auth, db } from '../firebase'
import ProfilePosts from './ProfilePosts'

const ProfileContent = ({photoURL, username, iduser}) => {
  const { setEditModal, signInWithGoogle, isAuth } = usePosts()
  const [isFollowed, setIsFollowed] = useState(false)
  const [followUser, setFollowUser] = useState([])
  const [siguiendo, setSiguiendo] = useState([])
  const [personalPosts, setPersonalPosts] = useState([])

  const showEditModal = ()=>{
    setEditModal(true)
  }


  /************FOLLOWs / FOLLOWERS************/
  useEffect(
    () =>
      onSnapshot(collection(db, "usuarios", iduser, "followers"), (snapshot) =>
        setFollowUser(snapshot.docs)
      ),
    [db, iduser]
  );

  useEffect(()=>{
    const followsDb = async ()=> { onSnapshot(
      query(collectionGroup(db, "followers"), where("followId", "!=", iduser), where("iduser", "==", iduser)),
      (snapshot)=>{
        setSiguiendo(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
      }
    )}
    followsDb()
  },[db, iduser])

  useEffect(()=>{
      setIsFollowed(followUser.findIndex((follow)=> follow.id === auth?.currentUser?.uid) !== -1)
  },[followUser])

  const followUserAction = async ()=> {
    if(isAuth){
        if(isFollowed){
            await deleteDoc(doc(db, "usuarios",iduser,"followers", auth?.currentUser?.uid))
        } else {
            await setDoc(doc(db, "usuarios",iduser,"followers", auth?.currentUser?.uid), {
                username: auth?.currentUser?.displayName.split(" ").join("").toLocaleLowerCase(),
                iduser: auth?.currentUser?.uid,
                followId: iduser,
                userImg: auth?.currentUser.photoURL,
                timestamp: serverTimestamp()
            })
        }}
    else {
        return signInWithGoogle()
    }
}

  /***********************PERSONAL POSTS***************************/
  useEffect(()=>{
    const personalPostsDb = async ()=> { onSnapshot(
      query(collection(db, "posts"), where("iduser", "==", iduser)),
      (snapshot)=>{
        setPersonalPosts(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
      }
    )}
    personalPostsDb()
  },[db, iduser])

  /******************************************/

  return (
    <div className=''>
    <div className='pt-4 w-full flex flex-col min-h-screen'>
    <div className='w-full min-h-screen bg-[#ddd] dark:bg-black overflow-hidden'>
        <div className='min-h-[100px] mt-10 w-full border-b border-gray-900 dark:border-gray-600 flex flex-col items-center dark:text-white text-black'>
          <img src={photoURL} alt="Avatar User" className='w-[120px] h-[120px] rounded-full my-6'/>
          <span className='text-lg font-bold mb-6'>
              @{username?.split(" ").join("").toLocaleLowerCase()}
          </span>
          <div className='min-h-[50px] w-full flex items-center justify-center mb-6'>
              <div className='min-w-[50px] min-h-[50px] flex flex-col items-center mr-4'>
                {personalPosts.length > 0 ? <strong className='text-lg font-bold'>{personalPosts.length}</strong>
                : 
                <strong className='text-lg font-bold'>0</strong>
              }
                <p className='dark:text-gray-300'>Post</p>
              </div>
              <div className='min-w-[50px] min-h-[50px] flex flex-col items-center mr-4'>
                {followUser.length > 0 ? 
                  <strong className='text-lg font-bold'>{followUser.length}</strong>
                  :
                  <strong className='text-lg font-bold'>0</strong>
                }
                <p className='dark:text-gray-300'>Followers</p>
              </div>
              <div className='min-w-[50px] min-h-[50px] flex flex-col items-center'>
                {siguiendo.length > 0 ? 
                  <strong className='text-lg font-bold'>{siguiendo.length}</strong>
                  :
                  <strong className='text-lg font-bold'>0</strong>
                }
                <p className='dark:text-gray-300'>Follows</p>
              </div>
          </div>
          {iduser === auth?.currentUser?.uid
            ?
            <>
              <button className='mb-6 outline-none border border-gray-900 dark:border-gray-600 px-8 py-3 rounded-md font-bold' onClick={showEditModal}>
                Editar perfil
              </button>
              <p className='mb-6'>Pulsa para añadir descripción corta</p>
            </>
            :
            <>
            {isFollowed
              ?
              <button className='mb-6 outline-none border bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 border-gray-800 dark:border-gray-600 px-8 py-3 rounded-md font-bold' onClick={followUserAction}>
                Siguiendo
              </button>
              :
              <button className='mb-6 outline-none border bg-transparent dark:bg-black dark:text-white text-gray-900 border-gray-900 dark:border-gray-600 px-8 py-3 rounded-md font-bold' onClick={followUserAction}>
                Seguir
              </button> 
            }
            </>
          }
          </div>
          <ProfilePosts iduser={iduser} />
        </div>
    </div>
    </div>
  )
}

export default ProfileContent