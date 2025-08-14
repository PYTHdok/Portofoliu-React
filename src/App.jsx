import { useState } from 'react'

import Header from './components/Header'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Work from './components/Work'
import Works from './components/Works'
function App() {


  return (
    <>
      <Header />
      <main className='main'>
        <Home />
        <About />
        <Work />
        <Works />
        <Contact />
      </main>
        
    </>
  )
}

export default App
