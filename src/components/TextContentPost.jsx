import React from 'react'
import { FiSend } from "react-icons/fi"
import { FaTrashAlt } from "react-icons/fa"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { auth, db } from '../firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const TextContentPost = ({postId, tags ,deployTextPost, setDeployTextPost, description, userImg, username, stateComments, content, setContent, sendComment}) => {
    const usuarioId = auth?.currentUser?.uid

    const closeModal = ()=>{
        setDeployTextPost(false)
    }

  return (
  <>
  { deployTextPost &&  
    <>    
    <div className='w-full min-h-screen dark:text-white bg-[#ddd] dark:bg-black fixed inset-0 z-50 overflow-auto flex flex-col'>
        <div className='px-4 w-full min-h-[50px] border-b border-b-gray-800 dark:border-b-gray-200 text-2xl flex justify-between items-center'>
            <div className='font-bold flex items-center'>
                <AiOutlineArrowLeft className='w-8 h-8 font-bold mr-2 dark:text-white' onClick={closeModal}/>
                Comments
            </div>
        </div>
        <div className='w-full min-h-[200px] px-2 flex flex-col justify-center border-b border-gray-600'>
            <div className='pt-4 w-full min-h-[100px] overflow-y-auto bg-[#ddd] dark:bg-black flex justify-start items-start mb-4'>
                <div className='w-fit min-h-[100px]'>
                    <div className='w-[60px] h-[60px] rounded-full border border-[#f20069] overflow-hidden'>
                        <img src={userImg} alt="User avatar" className='w-full h-full object-cover' />
                    </div>
                </div>
                <div className='w-full min-h-[100px] bg-[#ddd] dark:bg-black dark:text-white px-4 relative'>
                    <p className='min-h-[60px] mb-2'>{username} {description + "."}</p>
                    <p className='w-full min-h-[50px] bg-inherit'>
                        <span className='font-bold text-blue-800 cursor-pointer'>
                            {tags ?
                                <Link to={`/explore/tags/${tags}`}>
                                    #{tags}
                                </Link> 
                                :
                                ""
                            }
                        </span>
                    </p>
                </div>
            </div>
            <p className='uppercase text-[#aaa] text-[11px] font-bold'>21 de Enero de 2022</p>
        </div>
        <div className='pt-4 w-full min-h-[300px] px-2 bg-[#ddd] dark:bg-black flex justify-start items-start flex-col overflow-y-auto '>
            {stateComments.map((comment, index)=>{
                return (
                    <div className='pt-4 w-full min-h-[50px] my-2 mb-3 px-2 bg-[#ddd] dark:bg-black flex justify-start items-center' key={index}>
                        <div className='w-fit min-h-[50px]'>
                            <div className='w-[50px] h-[50px] rounded-full border border-[#f20069] overflow-hidden'>
                                <img src={comment.userImg} alt="User avatar" className='w-full h-full object-cover' />
                            </div>
                        </div>
                        <div className='w-full min-h-[50px] bg-[#ddd] dark:bg-black dark:text-white px-4'>
                            <p> <strong> {comment.username} </strong> {comment.comment + "."}</p>
                        </div>
                        {comment.iduser === usuarioId
                            ?
                            <div className='w-[50px] h-[50px] text-3xl font-bold text-red-500 flex items-center justify-center dark:text-red-500 z-50' 
                            onClick={(e) => {
                                e.stopPropagation()
                                deleteDoc(doc(db, "posts", postId, "comments", comment.id))
                            }}>
                                <FaTrashAlt className="w-5 h-5 font-bold text-red-500"/>
                            </div>
                            :
                            ""
                        }
                    </div>
                )
            })}
        </div>
        <div className='w-full min-h-[50px] z-50 bg-inherit p-2 flex flex-row pb-4 fixed bottom-0 left-0 '>
            <input type="text" placeholder='Añade un comentario...' className='w-full outline-none border-0 border-transparent bg-transparent mr-[5px]' value={content ? content : ""}  onChange={(e)=>{setContent(e.target.value)}} />
            <button className='outline-none border-0 bg-transparent' onClick={sendComment}>
                <FiSend className='w-7 h-7 dark:text-white'  />
            </button>
        </div>
    </div>
    </>
  }
  </>
  )
}

export default TextContentPost