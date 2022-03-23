import React, { lazy, Suspense } from 'react'
/*import ExplorePosts from './ExplorePosts'*/
import ExploreSearchbar from './ExploreSearchbar'
const ExplorePosts = lazy(()=>import('./ExplorePosts'))

const Explore = () => {
  return (
    <div className='w-full min-h-screen bg-[#ddd] dark:bg-black dark:text-white'>
        <ExploreSearchbar />
        <Suspense fallback={<div className='w-[50px] h-[50px] border-4 border-pink-700 border-l-transparent m-auto rounded-full animate-spin' />}>
          <ExplorePosts />
        </Suspense>
    </div>
  )
}

export default Explore