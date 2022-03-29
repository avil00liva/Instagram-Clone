import React, { useState } from 'react'
import { auth } from '../firebase'
import ExploreSearchbar from './ExploreSearchbar'
import InboxStateModal from './InboxStateModal'
import NavbarProfile from "./NavbarProfile"

const Inbox = () => {
  const [modalShow, setModalShow] = useState(true)
  const username = auth?.currentUser?.displayName
  const photoUrl = auth?.currentUser?.photoURL

  return (
    <div className='w-full min-h-screen bg-[#ddd] dark:bg-black dark:text-white'>
        <NavbarProfile username={username}  />
        <div className='w-full mt-10 h-full'>
            <ExploreSearchbar />
            <h1 className='px-4 font-bold pt-2 pb-8'>Mensajes</h1>
            <div className='w-full px-8 text-center'>
                <h2 className='text-2xl mb-4'>Envía mensajes a tus amigos</h2>
                <p className='text-gray-500 mb-4 text-sm'>
                    Intercambia mensajes, comunícate por videollamada o comparte tus publicaciones favoritas directamente con las personas que te importan.
                </p>
                <p className='text-gray-500 text-sm'>
                    Las personas que usan intagram o Facebook pueden chatear entre las apps. Ve a "Controles de mensajes" en la configuración para decidir quién puede ponerse en contato contigo.
                </p>
                <span className='mb-4 inline-block w-full text-sm'>
                    Más información sobre tu privacidad
                </span>
                <span className='font-bold text-blue-600'>
                    Enviar un mensaje
                </span>
            </div>
        </div>
        <InboxStateModal modalShow={modalShow} setModalShow={setModalShow} photoUrl={photoUrl} />
    </div>
  )
}

export default Inbox