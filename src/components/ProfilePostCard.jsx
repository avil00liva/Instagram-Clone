import React, { useState } from 'react'
import ProfileFullPost from './ProfileFullPost'

const ProfilePostCard = ({post}) => {
  const [profileFullPost, setProfileFullPost] = useState(false)

  return (
    <>
      <div className='min-w-[118px] w-[118px] h-[128px] quini:rounded-lg overflow-hidden z-[2] mx-[1px]' key={post.timestamp} onClick={()=> setProfileFullPost(true)}>
          <img 
              src={post.src} 
              alt="Post content" 
              className='w-full min-h-full z-[1] cursor-pointer transition-opacity duration-200 hover:opacity-80 object-cover'
          />
      </div>
      <ProfileFullPost src={post.src}
                       description={post.description}
                       userImg={post.userImg}
                       username={post.username}
                       iduser={post.iduser}
                       id={post.id}
                       setProfileFullPost={setProfileFullPost}
                       profileFullPost={profileFullPost}
      />
    </>
  )
}

export default ProfilePostCard

