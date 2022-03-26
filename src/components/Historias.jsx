import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from "react-icons/bs"
import { usePosts } from '../context/PostsContext';
import { db } from '../firebase';
import AllFullStories from './AllFullStories';
import HistoriaGlob from './HistoriaGlob';
import StorieGlob from './StorieGlob';


const Historias = () => {
    const { setUploadStoriesMenu, isAuth } = usePosts()
    const [ stories, setStories ] = useState([])
    const [allFullStories, setAllFullStories] = useState(false)


    useEffect(()=>{
        const storiesDb = async ()=> { onSnapshot(
          query(collection(db, "stories"), orderBy("username")),
          (snapshot)=>{
            setStories(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
          }
          )}
          storiesDb()
      },[])

  return (
      <>
    {isAuth && 
        <div className='mt-10 min-w-full min-h-[80px] border-b border-b-gray-600 flex items-center px-2 overflow-x-auto overflow-y-hidden bg-[#ddd] dark:bg-black'>
            <div className='w-full min-h-[80px] bg-transparent top-0 left-0 overflow-x-scroll overflow-y-hidden flex items-center pr-2'>
                <div className='min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] border-2 border-[#f20069] border-dashed rounded-full cursor-pointer transition-opacity duration-200 overflow-hidden relative hover:opacity-60 first:ml-2 flex justify-center items-center mr-4' onClick={()=>{setUploadStoriesMenu(true)}}>
                    <BsPlusLg className='w-7 h-7 dark:text-white' />
                </div>
                {/*{stories?.map((item, index)=>{
                    return (
                        <HistoriaGlob item={item} key={index} />
                    )}
                )}*/} 
                <div className="avatar-group ml-8" onClick={()=>{setAllFullStories(true)}}>
                    {stories.slice(1, 4).map((storie, index)=>{
                        return (
                            <StorieGlob key={index} storie={storie} />
                        )
                    })}
                </div>
            </div>
            <AllFullStories stories={stories} setAllFullStories={setAllFullStories} allFullStories={allFullStories} />
        </div>
    }
    </>
    )
};

export default Historias;
