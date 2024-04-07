import React from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from '../axios-client';

const Navbar = () => {
    const {setUser,setToken } = useStateContext();

    const onLogout = (e)=>{
        e.preventDefault()
        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)
        });
    }
    const { user, token } = useStateContext();

  return (
    <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold ">{user.name}</h1>
            <a href='#' onClick={onLogout} className="text-xl font-semibold ">Logout</a>
            <button className="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </nav>
  )
}

export default Navbar