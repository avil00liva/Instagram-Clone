import React, { useState } from 'react'
import { usePosts } from '../context/PostsContext'
import { BsFillTrashFill } from "react-icons/bs"
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { auth } from '../firebase'
import EditUsernameModal from './EditUsernameModal'

const MenuPost = ({setShowMenu, showMenu, id, iduser}) => {
    const {isAuth, editModal, setEditModal} = usePosts()
    const authUid = auth?.currentUser?.uid

    const showEditModal = ()=>{
        setEditModal(true)
        setShowMenu(false)
    }

    return (
    <>
      {isAuth && iduser === authUid  ? 
        <>
            <div className={showMenu ? 'min-h-[60px] min-w-[120px] border border-gray-300 rounded-xl overflow-hidden shadow-sm shadow-gray-400 absolute top-14 right-2 bg-white dark:bg-black' : "hidden"}>
                <ul className='w-full h-full'>
                    <li className='flex py-2 px-4 gap-1 items-center font-bold text-bg-900 cursor-pointer hover:bg-gray-300 transition-colors duration-200' onClick={(e) => {
                        e.stopPropagation()
                        deleteDoc(doc(db, "posts", id))
                        setShowMenu(false)
                    }}>
                        Borrar foto <BsFillTrashFill className='ml-2 text-red-500' />
                    </li> 
                    <li className='flex py-2 px-4 gap-1 items-center font-bold text-bg-900 cursor-pointer hover:bg-gray-300 transition-colors duration-200' onClick={showEditModal}>
                        Editar perfil 
                    </li>  
                </ul>
            </div>
        </>
        :
        ""
    }
    </>
  )
}

export default MenuPost