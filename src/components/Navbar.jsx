import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (

    <nav className="sticky top-0  z-50 w-full bg-white/10 backdrop-blur-lg bg-opacity-80  border/white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold tracking-wide bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
        >
          MyTodo
        </Link>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 
          active:scale-95 transition-all duration-200 font-semibold 
          shadow-md hover:shadow-purple-500/40 cursor-pointer"
        >
          Logout
        </button>
      </div >
    </nav>
  )
}

export default Navbar
