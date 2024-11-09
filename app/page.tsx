import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
        <nav className="flex justify-end sticky top-0 left-0 z-50 w-full text-black py-4 px-8">
          <Link href='about' className="text-lg font-semibold hover:underline">
            About
          </Link>
        </nav>

        <div className="flex flex-col flex-grow items-center justify-center w-full">
          <h1 className="flex items-center text-7xl font-bold justify-center m-4">SoundScholars</h1>
          <p className='text-4xl font-semibold'>A cognitive tutor to learn musical rhythms</p>
          <div className='flex justify-center m-10 space-x-6'>
              <Link className='p-5 bg-violet-200 font-semibold rounded-lg'
                href='/exercises/noteAddition'>Exercises</Link>
              <Link href='/learningPages' className='p-5 bg-violet-200 font-semibold rounded-lg'
              >Tutorials</Link>
          </div>
        </div>

    </main>
  )
}
