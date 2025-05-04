import React, { useState } from 'react'
import UserTable from './components/UserTable'
import Header from './components/Header'

const App = () => {

  const[searchQuery, setSearchQuery] = useState("");

  return (
    <div className='w-full h-screen p-10 '>
      <Header searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} />
      <UserTable searchQuery = {searchQuery} />   
    </div>
  )
}

export default App