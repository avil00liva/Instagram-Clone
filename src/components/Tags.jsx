import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import tagImg from "../assets/images/hummingbird.png"
import { db } from '../firebase'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import ProfilePostCard from './ProfilePostCard'

const Tags = () => {
  const tagParams = useParams()
  const tag = tagParams?.tags
  const [postsByTag, setPostsByTag]=useState()

  useEffect( ()=>{
    const getPost = async ()=> { onSnapshot(
      query(collection(db, "posts"), where("tags", "==", tag) ,orderBy("timestamp", "desc"), limit(10)),
      (snapshot)=>{
        setPostsByTag(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
      }
      )}
      getPost()
    }, [tag])

  return (
<>
{ postsByTag &&
     <div className='w-full min-h-screen bg-[#ddd] dark:bg-black dark:text-white'>
      <nav className='z-10 w-full py-2 text-black dark:text-white h-11 bg-[#ddd] dark:bg-black dark:border-b-gray-200 border-b border-b-gray-600 px-2 flex justify-between items-center fixed top-0 left-0'>
      <div className='font-bold flex items-center'>
        <Link to="/">
          <AiOutlineArrowLeft className='w-8 h-8 font-bold mr-2 dark:text-white'/>
        </Link>
          #{tag}
        </div>
      </nav>
      <section className='mt-10 w-full h-full'>
        <div className='pl-2 w-full min-h-[150px] flex justify-between items-center border-b border-gray-400'>
          <div className='w-[100px] h-[100px] rounded-full flex items-center justify-center bg-transparent border border-gray-400 overflow-hidden'>
            <img src={tagImg} className='w-full h-full object-cover' alt="Tags pic" />
          </div>
          <div className='w-full min-h-[150px] flex-[0.9] flex flex-col justify-center items-center px-4 '>
            <span><strong>69,2 mill</strong> posts</span>
            <button className='my-2 w-full h-10 py-2 bg-blue-600 text-white rounded-lg'>
              Seguir
            </button>
            <small className='text-gray-500 dark:text-gray-300'>See more posts every week!!</small>
          </div>
        </div>
      </section>
      <div className='w-full min-h-[500px] text-black dark:text-white bg-inherit dark:bg-black quini:bg-white flex flex-wrap py-4 justify-start items-start'>
      {postsByTag.map((post, index)=>{
          return (
              <ProfilePostCard key={index} post={post} />
          )
      })}
      </div> 
    </div>
  }
    </>
  )
}

export default Tags