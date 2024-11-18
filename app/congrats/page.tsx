// Welcome component. See Figma for design
import Link from "next/link"
export default function Congrats() {
    return (
    <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col flex-grow items-center justify-center w-full space-y-10">
          <h1 className="flex items-center text-5xl font-bold justify-center m-4">Congrats!</h1>
          <p className='text-3xl font-semibold'>You've completed all the music learning lessons we have right now.</p>
          <div className="text-center text-lg">
            <p>We hope you've enjoyed your experience with Sound Scholars. </p>
            <p>We're developing more lessons and exercises, so stay tuned (haha music puns)!</p>
          </div>
        </div>
    </main>
      )
}