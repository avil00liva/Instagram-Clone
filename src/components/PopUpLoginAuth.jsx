import React from 'react'
import { usePosts } from "../context/PostsContext"

const PopUpLoginAuth = () => {
    const { isAuth, signInWithGoogle, setLoginWUserPass, setSessionEmailPass } = usePosts()

  return (
      <>
      { isAuth ? "" : 
        <div className='w-full min-h-[300px] bg-gray-200 rounded-t-lg text-gray-800 dark:text-gray-200 p-4 fixed bottom-0 left-0 flex flex-col items-center'>
            <h2 className='text-center font-lg font-bold mb-4'>Please login or create an account</h2>
            <button className='px-8 py-4 mb-2 bg-red-500 text-white font-bold opacity-100 mx-auto cursor-pointer rounded-lg' onClick={signInWithGoogle}>
                Login with google
            </button>
            <button className='px-8 py-4 bg-red-500 text-white font-bold opacity-100 mx-auto cursor-pointer rounded-lg' onClick={()=>setSessionEmailPass(true)}>
                Login with email
            </button>
            <p className='font-bold text-red-500 cursor-pointer mt-4 self-start opacity-100' onClick={()=>setLoginWUserPass(true)}>Sign up...</p>
        </div> 
        }
      </>
  )
}

export default PopUpLoginAuth