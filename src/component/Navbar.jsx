import React from 'react'
import { NavLink } from 'react-router-dom'
// import '../App.css'

function Navbar() {
    return (
        <div className='mt-0 flex flex-row w-[99.99%] text-2xl  bg-gray-700 p-5 place-content-evenly'>
            <NavLink className='text-white  hover:text-gray-300'
            to="/"
            >
                Home
            </NavLink>
            <NavLink className='text-white  hover:text-gray-300'
            to='/pastes'            
            >
                All Edits
            </NavLink>
        </div>
    )
}

export default Navbar