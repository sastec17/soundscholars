"use client";
import Link from 'next/link'
import { useState } from 'react'

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function attemptSignup() {
        // TODO: BE CALL TO LOG USER IN
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="flex flex-col flex-grow items-center justify-center w-full">
                <h1 className="flex items-center text-7xl font-bold justify-center m-4">SoundScholars</h1>
                <p className='text-4xl font-semibold'>Sign Up</p>
                <form className='flex flex-col items-center mt-10 space-y-8 bg-indigo-300 px-10 pt-10 pb-8 rounded-md'>
                    <div>
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Username
                        </label>
                        <input  
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rhythm" type="text" placeholder="Username"
                            onChange={(ev) => setUsername(ev.target.value)}
                            value={username} 
                        ></input>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Password
                        </label>
                        <input  
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rhythm" type="password" placeholder="********"
                            onChange={(ev) => setPassword(ev.target.value)}
                            value={password} 
                        ></input>
                    </div>
                    <div className='flex flex-col items-center space-y-2'>
                        <button 
                            className="py-3 px-4 bg-gray-100 rounded-md"
                            onClick={()=>attemptSignup()}
                            >
                            Sign Up
                        </button>
                        <Link href='/login'
                                className='w-full text-center hover:underline'>
                                Login here
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}