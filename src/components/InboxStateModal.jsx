import React from 'react'

const InboxStateModal = ({modalShow, setModalShow, photoUrl}) => {
  return (
    <>
    {modalShow &&
        <div>
            <div className='fixed top-0 left-0 z-[50] w-full min-h-screen bg-black opacity-30'>
            </div>
            <div className='bg-[#ddd] dark:bg-[#262626] fixed top-[20%] left-[20%] rounded-lg w-[230px] min-h-[250px] z-[60] pt-4 flex flex-col items-center overflow-hidden'>
                <img src={photoUrl} className="w-[80px] h-[80px] rounded-full" alt="User avatar" />
                <strong className='py-4 text-base'>Define un estado</strong>
                <p className='text-gray-500 text-sm pb-4 text-center px-4'>
                    Define un estado por 24 horas para que los demas sepan lo que estás haciendo. Solo tus seguidores a los que también sigues podrán verlo.
                </p>
                <button className='text-sm w-full min-h-[40px] font-bold text-blue-600 hover:bg-[#313131] transition-colors duration-300 rounded-tl-lg rounded-tr-lg' onClick={()=>setModalShow(false)}>
                    Definir estado
                </button>
                <button className='text-sm w-full hover:bg-[#313131] transition-colors duration-300 min-h-[40px]' onClick={()=>setModalShow(false)}>
                    Ahora no
                </button>
            </div>
        </div>
    }
    </>
  )
}

export default InboxStateModal