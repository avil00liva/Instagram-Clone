import React, { lazy, Suspense } from 'react';
import PopUpLoginAuth from "./PopUpLoginAuth"
import { usePosts } from '../context/PostsContext';
/*import PostCard from './PostCard';*/
import UploadStories from './UploadStories';
import PostCardLoading from './PostCardLoading';
const PostCard = lazy(()=>import('./PostCard'))


const Content = () => {
  const {posts, isAuth} = usePosts() 

  return (
      <div className={`w-full min-h-[calc(100vh-120px)] mb-8 bg-[#ddd] dark:bg-black py-4 px-2 ${!isAuth ? "mt-14" : ""}`}>
        <Suspense fallback={<PostCardLoading />}>
          {posts.map((post, index)=>{
              return (
                  <PostCard {...post} key={index} />
              )})
          }
        </Suspense>
        <PopUpLoginAuth />
        <UploadStories />
      </div>
    );
};

export default Content;
