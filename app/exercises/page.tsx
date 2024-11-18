"use client";
import Link from "next/link"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Exercises() {
    function logout() {
        Cookies.remove("username");
        Cookies.remove("level");
        window.location.href = '/';
      }

      const [noteAddition, setNoteAddition] = useState(true);
      const [noteIdentification, setNoteIdentification] = useState(true);
      const [completeMeasure, setCompleteMeasure] = useState(true);
      const [typeRhythm, setTypeRhythm] = useState(true);

      useEffect(() => {
        fetch("/api/getExerciseTypes", { credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: Cookies.get('username')
            })
        })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            setNoteAddition(data.includes('noteAddition'));
            setTypeRhythm(data.includes('typeRhythm'));
            setNoteIdentification(data.includes('noteIdentification'));
            setCompleteMeasure(data.includes('completeMeasure'));
        })
    }, []);

    return(
        <main className="flex min-h-screen flex-col items-center">
            <nav className="sticky top-0 left-0 z-50 w-full text-black py-4">
                <div className="md:px-8">
                {/** Top NavBar */}
                <section className="flex justify-between items-center">
                    <Link href='/exercises' className="text-xl font-bold">
                        SoundScholars
                    </Link>
                    <div className="space-x-8">
                        {/* <Link href="/about" className="text-lg font-semibold hover:underline">
                            About
                        </Link> */}
                        <Link href="/learningPages" className="text-lg font-semibold hover:underline">
                            Learning Pages
                        </Link>
                        <button onClick={()=>logout()} className="text-lg font-semibold hover:underline">
                            Logout
                        </button>
                    </div>
                </section>
            </div>
        </nav>
        <div className="flex flex-grow flex-col pt-24 text-center">
            <h1 className="text-3xl font-semibold mb-5">Exercises</h1>
            <p>Select an activity and begin learning</p>

            <div className='flex flex-col space-y-10 pt-10'>
                <div className="flex items-center space-x-10 items-stretch">
                <div className={'flex-1 py-4 px-3 '+(noteAddition ? 'bg-indigo-300' : 'bg-slate-300')+' rounded-md text-center hover:'+(noteAddition ? 'bg-indigo-500' : 'bg-slate-500')}>
                        <Link href='/exercises/noteAddition'>
                            <p className="font-semibold text-xl">Note Addition</p>
                            <p className="text-md">Identify equivalent note values</p>
                        </Link>
                    </div>
                    <div className={'flex-1 py-4 px-3 '+(noteIdentification ? 'bg-indigo-300' : 'bg-slate-300')+' rounded-md text-center hover:'+(noteIdentification ? 'bg-indigo-500' : 'bg-slate-500')}>
                        <Link href='/exercises/noteIdentification'>
                            <p className="font-semibold text-xl">Note Identification</p>
                            <p className="text-md">Identify notes and rests</p>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-10 items-stretch">
                <div className={'flex-1 py-4 px-3 '+(completeMeasure ? 'bg-indigo-300' : 'bg-slate-300')+' rounded-md text-center hover:'+(completeMeasure ? 'bg-indigo-500' : 'bg-slate-500')}>
                        <Link href='/exercises/completeMeasure'>
                            <p className="font-semibold text-xl">Complete the Measure</p>
                            <p className="text-md">Discover the missing note</p>
                        </Link>
                    </div>
                    <div className={'flex-1 py-4 px-3 '+(typeRhythm ? 'bg-indigo-300' : 'bg-slate-300')+' rounded-md text-center hover:'+(typeRhythm ? 'bg-indigo-500' : 'bg-slate-500')}>
                        <Link href='/exercises/typeRhythm'>
                            <p className="font-semibold text-xl">Type that Rhythm</p>
                            <p className="text-md">Apply notation and time signature knowledge</p>
                        </Link>
                    </div>
                </div>
                <p><i>Note: Exercises will be greyed out if you have completed enough of that type to proceed to the next level.</i></p>
            </div>
        </div>
     </main>
    )
}