// Welcome component. See Figma for design
import Link from "next/link"
export default function Welcome() {
    return (
    <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col flex-grow items-center justify-center w-full space-y-10">
          <h1 className="flex items-center text-5xl font-bold justify-center m-4">Welcome to SoundScholars!</h1>
          <p className='text-3xl font-semibold'>The premier tutor for learning musical rhythms</p>
          <div className="text-center text-lg">
            <p>Your goal is to learn rhythms and "level up" by completing exercises.</p>
            <p>We will introduce new concepts via learning pages after you complete a level.</p>
          </div>
          <div className='flex justify-center m-5 space-x-6'>
            <Link className='p-5 bg-indigo-300 font-semibold rounded-lg hover:bg-indigo-500'
              href='/learningPages/levels/level00'>Get Started</Link>
          </div>
        </div>
    </main>
      )
}