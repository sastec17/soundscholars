import Link from "next/link"
export default function Exercises() {
    return(
        <main className="flex min-h-screen flex-col items-center pt-24">
        
        
        <h1 className="text-3xl font-semibold mb-5">Exercises</h1>
        <p>Select an activity and begin learning :p</p>
        <p> Not sure if this page is needed?? </p>

        <p>TODO: Styling - make all the boxes same size, regardless of text</p>
        <div className='flex flex-col space-y-10'>
            <div className="flex items-center space-x-10">
                <div className='py-4 px-3 bg-indigo-300 rounded-md text-center'>
                    <Link href='/exercises/noteAddition'>
                        <p className="font-semibold text-xl">Note Addition</p>
                        <p className="text-md">Identify equivalent note values</p>
                    </Link>
                </div>
                <div className='py-4 px-3 bg-indigo-300 rounded-md text-center'>
                    <Link href='/exercises/notationIdentification'>
                        <p className="font-semibold text-xl">Notation Identification</p>
                        <p className="text-md">Identify notes and rests</p>
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-10">
                <div className='py-4 px-3 bg-indigo-300 rounded-md text-center'>
                    <Link href='/exercises/noteAddition'>
                        <p className="font-semibold text-xl">Complete the Measure</p>
                        <p className="text-md">Uncover the missing note</p>
                    </Link>
                </div>
                <div className='py-4 px-3 bg-indigo-300 rounded-md text-center'>
                    <Link href='/exercises/notationIdentification'>
                        <p className="font-semibold text-xl">Type that Rhythm</p>
                        <p className="text-md">Apply notation and time signature knowledge</p>
                    </Link>
                </div>
            </div>
        </div>
     </main>
    )
}