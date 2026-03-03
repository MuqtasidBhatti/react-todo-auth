import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()

        if (name.trim() === "" || password === "") {
            return setError("Fill all fields ")
        }

        setError("")
        login()
        navigate('/')
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setError("")
        },1500)
        return () => clearTimeout(timeout)
    })
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-800 via-purple-950 to-black p-4">

            <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center"
                >
                    Login Page
                </h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setError("")
                        }}
                        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                    <input
                        type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}
                        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                    {error && (
                        <p className="text-red-500 mb-4 text-center text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type='submit'
                        className="w-full py-3 rounded-lg bg-purple-900 hover:bg-purple-700 text-white font-semibold transition-colors duration-300 cursor-pointer"
                    >
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Login
