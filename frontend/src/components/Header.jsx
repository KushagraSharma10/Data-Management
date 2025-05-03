import React from 'react'

const Header = () => {
  return (
    <div className="upper mb-4 flex items-center justify-between">
          <div className="search bg-white p-3 px-4 text-md rounded-4xl">
            <input className='w-full outline-none'  type="search" placeholder="Search..." />
          </div>
          <a href='/user/create' className="btn px-3 py-2 text-sm font-semibold tracking-tight bg-orange-400 rounded-md text-white">
            Add User
          </a>
        </div>
  )
}

export default Header