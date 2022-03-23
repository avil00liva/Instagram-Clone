import React from 'react'
import { usePosts } from '../context/PostsContext'
import { IoMdClose } from "react-icons/io"
import { BsMoon, BsSun } from "react-icons/bs"

const UserSettings = () => {
    const { setUserSettings, userSettings, setDarkTheme,  darkTheme, signUserOut} = usePosts()

    const changeTheme = ()=> {
        setDarkTheme(!darkTheme)
    }

  return (
        <>
        {userSettings &&
            <div className='w-full min-h-screen bg-[#ddd] dark:bg-black fixed inset-0 z-50'>
                <div className="w-full border-b dark:border-white border-black min-h-[50px] mb-8 pb-4 dark:text-white px-2 py-3 flex justify-between items-center">
                    <span className='text-2xl font-bold'>
                        Settings
                    </span>
                    <IoMdClose className='w-8 h-8 font-bold dark:text-white' onClick={()=>setUserSettings(false)}/>
                </div>
                <div className='w-full min-h-[100px] px-4 flex justify-start items-center flex-col'>
                    <div className='w-full min-h-[100px] flex justify-between items-center px-4'>
                        <h1 className='text-2xl mb-4 dark:text-white'>Dark mode:</h1>
                        {darkTheme ?
                            <div className='w-[60px] h-[60px] text-lg text-bold flex justify-center items-center rounded-md bg-gray-200 cursor-pointer dark:bg-gray-600' onClick={changeTheme}>
                                <BsMoon className='text-bold dark:text-gray-300 w-6 h-6' />
                            </div>
                            :
                            <div className='w-[60px] h-[60px] text-lg flex justify-center items-center rounded-md bg-gray-600 cursor-pointer text-bold' onClick={changeTheme}>
                                <BsSun className='text-gray-300 dark:text-gray-300 text-bold w-6 h-6' />
                            </div>
                        }
                    </div>
                </div>
                <div className='bg-inherit w-full min-h-[50px] mt-8 flex justify-center'>
                    <button className='px-4 py-6 font-bold text-xl dark:text-black bg-black text-white dark:bg-white outline-none border-0 rounded-lg' onClick={signUserOut}>Sign out</button>
                </div>
            </div>
        }
    </>
  )
}

export default UserSettings