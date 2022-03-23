import React from 'react'
import Historias from "./Historias"
import Content from "./Content"
import Navbar from './Navbar'

const Home = () => {

  return (
    <>
        <Navbar />
        <Historias />
        <Content />
    </>
  )
}

export default Home