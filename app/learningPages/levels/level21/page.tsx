// Tied notes learning pages
import Link from "next/link"
import Image from "next/image";
export default function Level11() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl font-semibold mb-5">Level 2: Tied Notes</h1>
            <p><b>Key Idea:</b> Adding a "tie" between notes indicates that there will only be one pitch played, but the pitch will be held for the duration of both notes.</p>
            <h2 className="font-semibold">For example: </h2>
            <div className="flex items-center justify-center relative w-48 h-24">
                    <Image 
                        alt="Tied notes" 
                        src="/app/images/tied_measure.png" 
                        fill 
                        className="object-contain"
                    />
            </div>
            <p>This shows a measure 2 quarter notes "tied" together.</p>
            <p>Audibly, this is equivalent to playing 1 half note.</p>
            <p>The above measure would therefore be counted as "1 3", because we don't play a new pitch on beat 2.</p>
            <div className="space-x-8">
                <Link href='/learningPages/levels/level20' className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Back
                </Link>
                <Link href='/exercises' className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Exercises
                </Link>
            </div>
        </main>
      )
}