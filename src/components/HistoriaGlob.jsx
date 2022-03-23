import React, { lazy, Suspense, useState } from 'react'
/*import FullStories from './FullStories'*/
const FullStories = lazy(()=>import('./FullStories'))

const HistoriaGlob = ({item}) => {
  const [ fullStorie, setFullStorie ] = useState(false)
  const [ viewed, setViewed] = useState(false)

  const view = ()=>{
    setFullStorie(true)
    setViewed(true)
    localStorage.setItem("viewed", true)
  }

  const confirmView = localStorage.getItem("viewed")

  return (
    <>
    <Suspense fallback={<div className='w-[50px] h-[50px] border-4 border-pink-700 border-l-transparent m-auto rounded-full animate-spin' />}>
        <div className={`min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] border-2 border-[#f20069] rounded-full cursor-pointer transition-opacity duration-200 overflow-hidden relative hover:opacity-80 first:ml-2 ${viewed && confirmView ? "opacity-30" : ""}`} onClick={view}>
            <img src={item.userImg} alt="Avatar" className='w-full h-full object-cover'/>
        </div>
          <FullStories src={item.src}
                      description={item.description}
                      userImg={item.userImg}
                      username={item.username}
                      iduser={item.iduser}
                      id={item.id}
                      setFullStorie={setFullStorie}
                      fullStorie={fullStorie}
                      viewed={viewed}
                      setViewed={setViewed}
          />
        </Suspense>
    </>
  )
}

export default HistoriaGlob