"use client";
import Link from "next/link"
import Cookies from "js-cookie";
export default function Exercises() {
    function logout() {
        Cookies.remove("username");
        Cookies.remove("level");
        window.location.href = '/';
  
      }
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
                        <Link href="/about" className="text-lg font-semibold hover:underline">
                            About
                        </Link>
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
                    <div className='flex-1 py-4 px-3 bg-indigo-300 rounded-md text-center hover:bg-indigo-500'>
                        <Link href='/exercises/noteAddition'>
                            <p className="font-semibold text-xl">Note Addition</p>
                            <p className="text-md">Identify equivalent note values</p>
                        </Link>
                    </div>
                    <div className='flex-1 py-4 px-3 bg-indigo-300 rounded-md text-center hover:bg-indigo-500'>
                        <Link href='/exercises/noteIdentification'>
                            <p className="font-semibold text-xl">Note Identification</p>
                            <p className="text-md">Identify notes and rests</p>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center space-x-10 items-stretch">
                    <div className='flex-1 py-4 px-3 bg-indigo-300 rounded-md text-center hover:bg-indigo-500'>
                        <Link href='/exercises/completeMeasure'>
                            <p className="font-semibold text-xl">Complete the Measure</p>
                            <p className="text-md">Discover the missing note</p>
                        </Link>
                    </div>
                    <div className='flex-1 py-4 px-3 bg-indigo-300 rounded-md text-center hover:bg-indigo-500'>
                        <Link href='/exercises/typeRhythm'>
                            <p className="font-semibold text-xl">Type that Rhythm</p>
                            <p className="text-md">Apply notation and time signature knowledge</p>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
     </main>
    )
}