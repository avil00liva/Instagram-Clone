import React from 'react'

const PostCardLoading = () => {
  return (
    <div className='m-auto mb-8 w-full max-w-[500px] min-h-[500px] bg-[#eee] dark:bg-gray-900 shadow-md rounded-lg relative dark:text-white flex justify-center items-center'>
        <div className='w-[80px] h-[80px] border-4 border-pink-700 border-l-transparent m-auto rounded-full animate-spin' />
    </div>
  )
}

export default PostCardLoading

