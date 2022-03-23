/* eslint-disable no-unused-expressions */
import React, { useRef, useState } from 'react'
import { usePosts } from '../context/PostsContext'
import { MdSend } from "react-icons/md"
import { AiOutlineVideoCameraAdd } from "react-icons/ai"
import { FiLogIn } from "react-icons/fi"
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

const LoginWUserPass = () => {
    const  {loginWUserPass ,setLoginWUserPass, sessionEmailPass, setSessionEmailPass, signUpWEmailPassword, logInWEmailPassword} = usePosts()
    const filePickerRef = useRef(null)
    const [loading, setLoading]= useState(false)
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [username, setUsername]=useState("")
    const [photoURL, setPhotoURL]=useState(null)
    const [selectedFile, setSelectedFile]=useState(null)


    const addImageToPost = (e)=>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const sendAuthPost = async (e)=>{
        e.preventDefault()

        if (loading) return
        setLoading(true)
        try {
            await signUpWEmailPassword(email, password).then( async ()=>{
                async ()=>{
                    const docId = auth?.currentUser?.uid
                    await setDoc(doc(db, "usuarios", docId), {
                      iduser: auth?.currentUser?.uid,
                    });
                }
                const docRef = await addDoc(collection(db, "usuarios"), {
                    username: username,
                    email: email,
                    password: password
                })
                const imageRef = ref(storage, `usuarios/${docRef.id}/photourl`)
                if (selectedFile){
                    await uploadString(imageRef, selectedFile,"data_url").then(async ()=>{
                        const downloadUrl= await getDownloadURL(imageRef)
                        await updateDoc(doc(db, "usuarios", docRef.id),{
                        photoURL: downloadUrl,
                        }).then( updateProfile(auth.currentUser, {
                            displayName: username,
                            photoURL: downloadUrl,
                        }))
                    })
                }
            })
        }
        catch(err) {
            console.log(err);
        }
        setLoading(false)
        setEmail("")
        setPassword("")
        setUsername("")
        setPhotoURL(null)
        setLoginWUserPass(false)
    }

    const handleLogin = async (e)=> {
        e.preventDefault()
        try {
            await logInWEmailPassword(email, password)
        } catch(err) {
            console.log(err);
        }
        setSessionEmailPass(false)
    }



  return (
    <>

        {sessionEmailPass &&
            <div className='z-50 p-4 w-full min-h-screen bg-[#ddd] dark:bg-black text-black dark:text-white fixed left-0 top-0'>
            <div className='w-full min-h-[100px] flex flex-col items-center gap-2'>
                <span className='cursor-pointer border-b-2 border-b-gray-800 dark:border-b-gray-200 font-bold text-lg text-gray-900 dark:text-white self-start' onClick={()=> setSessionEmailPass(false)}>
                    ⬅ Atras
                </span>
                <input type="email" placeholder='Introduce tu correo' className='my-4 w-[70%] py-2 px-2 outline-none border-0 border-transparent' autoComplete='off' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder='Introduce tu contraseña' className='my-4 w-[70%] py-2 px-2 outline-none border-0 border-transparent' autoComplete='off' onChange={(e)=>{setPassword(e.target.value)}}/>

                <button className='cursor-pointer bg-blue-500 py-5 px-8 flex items-center gap-2 rounded-md transition-colors duration-300 hover:bg-blue-600 mt-14' onClick={handleLogin}>
                    <FiLogIn className='text-white w-8 h-8' /> 
                    <span className='text-white font-bold text-lg'>
                        Log in
                    </span>
                </button>
                {loading && <div className='w-[50px] h-[50px] border-4 border-gray-600 dark:border-gray-200 border-l-transparent m-auto rounded-full animate-spin' />}
            </div>
        </div>
        }

        {loginWUserPass &&
            <div className='z-50 p-4 w-full min-h-screen bg-[#ddd] dark:bg-black text-black dark:text-white fixed left-0 top-0'>
                <div className='w-full min-h-[100px] flex flex-col items-center gap-2'>
                    <span className='cursor-pointer border-b-2 border-b-gray-800 dark:border-b-gray-200 font-bold text-lg text-gray-900 dark:text-white self-start' onClick={()=> setLoginWUserPass(false)}>
                        ⬅ Atras
                    </span>
                    <input type="email" placeholder='Introduce tu correo' className='my-4 w-[70%] py-2 px-2 outline-none border-0 border-transparent' autoComplete='off' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder='Introduce tu contraseña' className='my-4 w-[70%] py-2 px-2 outline-none border-0 border-transparent' autoComplete='off' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input type="text" placeholder='Introduce tu nickname' className='my-4 w-[70%] py-2 px-2 outline-none border-0 border-transparent' autoComplete='off' onChange={(e)=>{setUsername(e.target.value)}}/>

                    <div className='addTiktokInput flex items-start w-full pt-8 pl-20 cursor-default'>
                        <AiOutlineVideoCameraAdd className='self-start text-5xl text-gray-600 dark:text-gray-200 cursor-pointer'  onClick={()=> filePickerRef.current.click()} />
                        <input type="file" hidden onChange={addImageToPost} ref={filePickerRef} />
                    </div>

                    <button className='cursor-pointer bg-blue-500 py-5 px-8 flex items-center gap-2 rounded-md transition-colors duration-300 hover:bg-blue-600 mt-14' onClick={sendAuthPost}>
                        <FiLogIn className='text-white w-8 h-8' /> 
                        <span className='text-white font-bold text-lg'>
                            Crear cuenta
                        </span>
                    </button>
                    {loading && <div className='w-[50px] h-[50px] border-4 border-gray-600 dark:border-gray-200 border-l-transparent m-auto rounded-full animate-spin' />}
                </div>
            </div>
        }
    </>
  )
}

export default LoginWUserPass