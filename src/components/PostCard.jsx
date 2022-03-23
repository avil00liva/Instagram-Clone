/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BsInbox, BsInboxFill } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { FiSend } from "react-icons/fi"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, serverTimestamp, setDoc } from 'firebase/firestore';
import { collectionGroup, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase';
import { usePosts } from '../context/PostsContext'
import MenuPost from './MenuPost'
import { Link } from 'react-router-dom'

const PostCard = ({id, description, idDocUser, iduser, src, userImg, username}) => {
    const {isAuth, signInWithGoogle} = usePosts()
    const usuarioId = auth?.currentUser?.uid
    const [liked, setLiked] = useState([])
    const [likesDoc, setLikesDoc] = useState([])
    const [Statecomments, setStateComments]=useState([])
    const [commented, setCommented]=useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [content, setContent] = useState("")
    const [followUser, setFollowUser] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [savesDoc, setSavesDoc] = useState([])



    /************************SAVE POST***************************/

    useEffect(
        () =>
          onSnapshot(collection(db, "posts", id, "saves"), (snapshot) =>
          setSavesDoc(snapshot.docs)
          ),
        [db, id]
      );
    
      useEffect(()=>{
        setSaved(savesDoc.findIndex((save)=> save.id === usuarioId) !== -1)
      },[savesDoc])
      
    const savePost = async ()=> {
        if(isAuth){
            if(saved){
                await deleteDoc(doc(db, "posts",id, "saves", usuarioId))
            } else {
                await setDoc(doc(db, "posts",id,"saves", usuarioId), {
                    username: username,
                    iduser: iduser,
                    postId: iduser,
                    savedBy: usuarioId,
                    description: description,
                    userImg: userImg,
                    src: src,
                    timestamp: serverTimestamp()             
                })
            }}
        else {
            return signInWithGoogle()
        }
    }

    /*********************************************************/


    /*************************LIKE POST***********************/
    useEffect(
        () =>
          onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikesDoc(snapshot.docs)
          ),
        [db, id]
      );

    useEffect(()=>{
        setLiked(likesDoc.findIndex((like)=> like.id === usuarioId) !== -1)
    },[likesDoc])

    const likePost = async ()=> {
        if(isAuth){
            if(liked){
                await deleteDoc(doc(db, "posts",id,"likes", usuarioId))
            } else {
                await setDoc(doc(db, "posts",id,"likes", usuarioId), {
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
    /*********************************************************/

    /**************************COMMENT************************/
    useEffect(
        () =>
          onSnapshot(
            query(
              collection(db, "posts", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => {setStateComments(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))}
          ),
        [db, id]
      );

    useEffect(()=>{
        setCommented(Statecomments.findIndex((comment)=> comment.id === auth?.currentUser?.uid) !== -1)
    },[Statecomments])

    const sendComment = async (e) => {
        e.preventDefault();
    
        await addDoc(collection(db, "posts", id, "comments"), {
          comment: content,
          username: auth.currentUser.displayName.split(" ").join("").toLocaleLowerCase(),
          userImg: auth.currentUser.photoURL,
          iduser: auth.currentUser.uid,
          postId: iduser,
          timestamp: serverTimestamp(),
        });

        return setContent("")
      };

    const deleteComments = async ()=> {
        if(Statecomments){
            await deleteDoc(doc(db, "posts", id, "comments", auth?.currentUser?.uid))
        }
    }
    /*********************************************************/
  
  const deployMenu = ()=>{
      setShowMenu(!showMenu)
  }

  /************FOLLOW******************/
  useEffect(
    () =>
      onSnapshot(collection(db, "usuarios", iduser, "followers"), (snapshot) =>
        setFollowUser(snapshot.docs)
      ),
    [db, iduser]
  );

  useEffect(()=>{
      setIsFollowed(followUser.findIndex((follow)=> follow.id === auth?.currentUser?.uid) !== -1)
  },[followUser])

const followUserAction = async ()=> {
    if(isAuth){
        if(isFollowed){
            await deleteDoc(doc(db, "usuarios",iduser,"followers", auth.currentUser.uid))
        } else {
            await setDoc(doc(db, "usuarios",iduser,"followers", auth.currentUser.uid), {
                username: auth.currentUser.displayName.split("").join("").toLocaleLowerCase(),
                iduser: auth.currentUser.uid,
                followId: iduser,
                userImg: auth.currentUser.photoURL,
                timestamp: serverTimestamp()
            })
        }}
    else {
        return signInWithGoogle()
    }
}
  /***********************************/


return (
    <div className='m-auto mb-8 w-full max-w-[500px] min-h-[500px] bg-[#eee] dark:bg-gray-900 shadow-md rounded-lg relative dark:text-white'>
        <div className='w-full min-h-[50px] border-b border-b-gray-600 flex items-center justify-between px-2 py-2 dark:border-b-gray-200'>
                <div className='flex items-center h-full'>
                    <span className='w-10 h-10 border border-[#f20069] rounded-full overflow-hidden cursor-pointer'>
                        <img src={userImg} alt="Avatar user" onError={(event) => event.target.style.display = 'none'} className='w-full h-full object-cover'/>
                    </span>
                    <Link to={`/profile/${iduser}`}>
                        <p className="ml-2 font-bold text-gray-700 dark:text-gray-200">
                            {username}
                        </p>
                    </Link>
                </div>
            {isAuth && iduser === usuarioId
            ?
            <div className='w-[50px] text-3xl cursor-pointer font-bold text-[#262626] flex-[0.1] items-center dark:text-white' onClick={deployMenu}>
            <BiDotsVerticalRounded className="w-7 h-7 font-bold" />
            </div>
            :
            <>
            {iduser === usuarioId
                ?
                ""
                :
                <>
                    {isFollowed
                    ?
                    <>
                    {isAuth
                        ?
                        ""
                        :
                    
                        <div className='w-[50px] cursor-pointer flex-[0.1] items-center mr-2'>
                            <span className='text-blue-700 dark:text-blue-500 font-bold text-base' onClick={followUserAction}>
                                Follow
                            </span>
                        </div>
                    }
                    </>
                    :
                    <div className='w-[50px] cursor-pointer flex-[0.1] items-center mr-2'>
                        <span className='text-blue-700 dark:text-blue-500 font-bold text-base' onClick={followUserAction}>
                            Follow
                        </span>
                    </div>
                    }
                </>
                }
            </>

            }

            </div>
        <div className='w-full min-h-[350px] bg-transparent'>
                <img src={src} alt="Post" className='w-full h-full'/>
        </div>
        <div className='w-full min-h-[50px] dark:text-white flex justify-between items-center px-2 gap-4'>
                <div className="flex items-center">
                    <span className='mr-[9px] cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        likePost();
                        }}>
                        {liked 
                            ?
                            <AiFillHeart className="w-7 h-7 font-bold cursor-pointer text-red-600" />
                            :
                            <AiOutlineHeart className="w-7 h-7 font-bold cursor-pointer" />
                        }
                    </span>
                    <span className='mr-[9px] cursor-pointer'>
                        <FaRegComment className="w-6 h-6 font-bold cursor-pointer" />
                    </span>
                    <span className='mr-[5px] cursor-pointer'>
                        <FiSend className="w-6 h-6 font-bold cursor-pointer" />
                    </span>
                </div>
                <div>
                    <span className='cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        savePost();
                        }}>
                        {saved 
                            ?
                            <BsInboxFill className='w-7 h-7 font-bold cursor-pointer' />
                            :
                            <BsInbox className='w-7 h-7 font-bold cursor-pointer' />
                        }
                    </span>
                </div>
        </div>
        <div className='w-full min-h-[30px] bg-transparent px-2 pb-4'>
                {likesDoc.length > 0 && <p className='font-bold'>{likesDoc.length} Likes</p>}
                <p className='mb-2 text-gray-800 dark:text-gray-200'>
                    <span className='font-bold text-black dark:text-white'>{username} </span>
                    {description}
                </p>
                <p className='uppercase text-[#aaa] text-[10px] font-bold'>21 de Enero de 2022</p>
        </div>
        <div className='w-full min-h-[50px] p-2 flex flex-row gap-[5px]'>
                <span className='text-[1.3rem] cursor-pointer transition-opacity duration-300 hover:opacity-80'>😊</span>
                <input type="text" placeholder='Añade un comentario...' className='w-full outline-none border-0 border-transparent bg-transparent' value={content ? content : ""}  onChange={(e)=>{setContent(e.target.value)}} />
                <button className='outline-none border-0 bg-transparent' onClick={sendComment}>
                    <FiSend className='w-7 h-7 dark:text-white'  />
                </button>
        </div>
        <MenuPost setShowMenu={setShowMenu} showMenu={showMenu} id={id} iduser={iduser} />
    </div>
  )
}

export default PostCard