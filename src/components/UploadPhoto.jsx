import React, { useRef, useState } from 'react'
import { usePosts } from '../context/PostsContext'
import { AiOutlineArrowRight, AiOutlineVideoCameraAdd } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'


const UploadPhoto = () => {
    const { setUploadPhMenu, uploadPhMenu, usuario } = usePosts()
    const filePickerRef = useRef(null)
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [selectedFile, setSelectedFile]=useState(null)
    const [loading, setLoading]= useState(false)

    const sendAuthPost = async (e)=> {
        e.preventDefault()

        if (loading) return 
        setLoading(true)

        const docRef = await addDoc(collection(db, "posts"), {
            idDocUser: usuario.length > 0 ? usuario[0]?.id : "",
            iduser: auth.currentUser.uid,
            username: auth.currentUser.displayName.split(" ").join("").toLocaleLowerCase(),
            userImg: auth.currentUser.photoURL,
            description: description,
            tags: tags,
            timestamp: serverTimestamp()
        })
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        if (selectedFile){
            await uploadString(imageRef, selectedFile,"data_url").then(async ()=>{
                const downloadUrl= await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    src: downloadUrl,
                })
            })
        }
        setLoading(false)
        setDescription("")
        setSelectedFile(null)
        setUploadPhMenu(false)
    }

    const addImageToPost = (e)=>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const closeModal = ()=>{
        setUploadPhMenu(false)
        setDescription("")
        setTags("")
        setSelectedFile(null)
    }
    
  return (
      <>
        {uploadPhMenu && 
            <div className='w-full min-h-screen dark:text-white bg-[#ddd] dark:bg-black fixed inset-0 z-50 overflow-auto'>
                <div className='px-4 w-full min-h-[50px] border-b border-b-gray-800 dark:border-b-gray-200 text-2xl flex justify-between items-center'>
                    <div className='font-bold flex items-center'>
                        <IoMdClose className='w-8 h-8 font-bold mr-2 dark:text-white' onClick={closeModal}/>
                        New post
                    </div>
                    <AiOutlineArrowRight className='w-7 h-7 font-bold' onClick={sendAuthPost} />
                </div>
                <div className='pt-4 pb-6 w-full min-h-screen px-4 bg-[#ddd] dark:bg-black'>
                    <textarea type="text" className='outline-none border border-transparent py-4 indent-1 w-full rounded-lg mb-4 text-gray-800' placeholder='Post description' onChange={(e)=>{setDescription(e.target.value)}} />
                    <input type="text" className='outline-none border border-transparent py-4 indent-1 w-full rounded-lg mb-4 text-gray-800' placeholder='Post tags' onChange={(e)=>{setTags(e.target.value)}} />
                    <div className='w-fit mb-8 flex items-center justify-between' onClick={()=> filePickerRef.current.click()}>
                        <AiOutlineVideoCameraAdd className='text-5xl text-gray-900 dark:text-white' />
                        <input type="file" hidden onChange={addImageToPost} ref={filePickerRef} />
                        {loading && <div className='w-[50px] h-[50px] border-4 border-pink-700 border-l-transparent m-auto rounded-full animate-spin' />}
                    </div>
                    {selectedFile &&
                        <img src={selectedFile} onError={(event) => event.target.style.display = 'none'} alt="Preview" className='w-full min-h-[100px] rounded-lg overflow-hidden bg-gray-600 mb-4 opacity-70' />
                    }
                    {/* <button type='submit' className='flex px-5 py-2 bg-gray-700 transition-colors hover:bg-gray-900 items-center gap-2 text-xl text-white rounded-lg cursor-pointer' onClick={sendAuthPost}>Cargar <MdSend className='self-end'/> </button>*/}
                </div>
            </div>
        }
      </>
  )
}

export default UploadPhoto