import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import NavbarProfile from "./NavbarProfile"
import ProfileContent from './ProfileContent'


const Profile = () => {
    const iduser = useParams()
    const idUsuario = iduser.iduser
    const [user, setUser] = useState()
  
    useEffect(()=>{
      const unsub = async ()=> { onSnapshot(doc(db, "usuarios", idUsuario), (doc) => {
        setUser(doc.data())
      })
    }
    unsub()
  },[idUsuario])

  
  return (
    <div className='text-white'>
        {user !== undefined &&
        <>
          <NavbarProfile {...user} />
          <ProfileContent {...user} />
        </>
        }
    </div>
  )
}

export default Profile