import React, { useState } from 'react'
import { usePosts } from '../context/PostsContext'
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { MdSend } from "react-icons/md"

const EditUsernameModal = () => {
    const {editModal, setEditModal} = usePosts()
    const [displayName, setDisplayName]=useState("")

    const updateProfileUser = async (e)=> {
        e.preventDefault()
        await updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(()=>{
            console.log("Profile updated!");
        }).catch((err)=>console.log(err))
        setEditModal(false)
    }

  return (
      <>
        {editModal &&
            <div className='w-full min-h-screen bg-[#ddd] fixed inset-0 z-50'>
                <div onClick={()=>setEditModal(false)}>X</div>
                <div className='w-full h-full p-4 text-center flex justify-center flex-col'>
                <h1 className='text-2xl mb-2 border-b py-4'>Editar perfil ✍🏼</h1>
                    <form>
                        <input type="text" placeholder='Display name' className='outline-none border-0 py-1 w-[80%] indent-1 my-3' value={displayName ? displayName : ""} onChange={(e)=>{setDisplayName(e.target.value)}}/>
                        <div className='w-full min-h-[80px] flex justify-around py-4 items-center'>
                            <button type='submit' className='flex px-5 py-2 bg-gray-500 transition-colors hover:bg-gray-700 items-center gap-2 text-xl text-white rounded-lg cursor-pointer' onClick={updateProfileUser}>Editar <MdSend className='self-end'/> </button>
                        </div>
                    </form>
                </div>
            </div>
        }
    </>
  )
}

export default EditUsernameModal