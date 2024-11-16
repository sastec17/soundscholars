"use client";
import Link from 'next/link'
import { useState } from 'react'
import Cookies from "js-cookie";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function attemptLogin() {
        fetch('/api/login', {
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({username: username, password:password})
            })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
             })
             .then((data) => {
                    if (!data.loggedIn){
                        alert("Incorrect username or password. Please try again.");
                    }
                    else {
                        Cookies.set("username", data.username);
                        Cookies.set("level", data.level);
                        // SET # CORRECTLY ANSWERED ALSO
                        // redirect
                        window.location.href = '/exercises/noteAddition';
                    }
                
              })
              .catch((error) => alert(error));
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="flex flex-col flex-grow items-center justify-center w-full">
                <h1 className="flex items-center text-7xl font-bold justify-center m-4">SoundScholars</h1>
                <p className='text-4xl font-semibold'>Log In</p>
                <form onSubmit={attemptLogin} className='flex flex-col items-center mt-10 space-y-8 bg-indigo-300 px-10 pt-10 pb-8 rounded-md'>
                    <div>
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Username
                        </label>
                        <input  
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                            onChange={(ev) => setUsername(ev.target.value)}
                            value={username} 
                        ></input>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Password
                        </label>
                        <input  
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"
                            onChange={(ev) => setPassword(ev.target.value)}
                            value={password} 
                        ></input>
                    </div>
                    <div className='flex flex-col items-center space-y-2'>
                        <button 
                            type='submit'
                            className="py-3 px-4 bg-gray-100 rounded-md"
                            >
                            Login
                        </button>
                        <Link href='/signup'
                            className='w-full text-center hover:underline'>
                            Sign up here
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}