import React from 'react'

const StorieGlob = ({storie}) => {
  return (
    <div className="avatar">
        <img src={storie.userImg} alt="User storie glob" />
    </div>
  )
}

export default StorieGlob