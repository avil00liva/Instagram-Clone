import React from 'react'
import data  from "../assets/FakeData/data"
import { usePosts } from '../context/PostsContext'

const ExplorePosts = () => {
    const { explorePosts, filterPosts } = usePosts()

  return (
  <div className='pb-16 w-full h-auto bg-inherit flex flex-wrap justify-start items-center'>
        {filterPosts.length === 0 ?  
            <>      
            {explorePosts.map((post, index)=>{
                return (
                    <div className='min-w-[118px] w-[118px] max-h-[128px] h-[128px] overflow-hidden z-[2] mx-[1px]' key={index}>
                        <img 
                            src={post.src} 
                            alt="Post content" 
                            className='w-full min-h-full max-h-[128px] z-[1] cursor-pointer transition-opacity duration-200 hover:opacity-80 object-cover'
                        />
                    </div>
                )
            })}
            </>   
            :
            <>
            {filterPosts.map((post, index)=>{
                return (
                    <div className='min-w-[118px] w-[118px] max-h-[128px] h-[128px] overflow-hidden z-[2] mx-[1px]' key={index}>
                        <img 
                            src={post.src} 
                            alt="Post content" 
                            className='w-full min-h-full max-h-[128px] z-[1] cursor-pointer transition-opacity duration-200 hover:opacity-80 object-cover'
                        />
                    </div>
                )
            })}
            </>
        }
    </div>
  )
}

export default ExplorePosts