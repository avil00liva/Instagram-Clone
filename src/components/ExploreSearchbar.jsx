import React from 'react'
import { usePosts } from '../context/PostsContext'

const ExploreSearchbar = () => {
  const { handleFilter } = usePosts()

  return (
    <div className='w-full min-h-[50px] bg-[#ddd] dark:bg-black py-3 px-4 dark:text-white relative'>
        <input type="text" className='bg-white dark:bg-gray-800 dark:text-white w-full h-full py-3 px-4 rounded-lg outline-none border-transparent' placeholder='Search..' onChange={handleFilter} />
    </div>
  )
}

export default ExploreSearchbar