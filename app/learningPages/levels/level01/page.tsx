// Welcome component. See Figma for design
// import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteWhole, mdiMusicRestHalf, mdiMusicRestQuarter, mdiMusicRestWhole } from "@mdi/js";
// import Icon from "@mdi/react";
import Link from "next/link"
import Image from "next/image";
export default function Level01() {
    const example_img = require("../../../../sql/uploads/level0/cm_4quarters.png");
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl font-semibold mb-5">Level 0: 4/4 Time Signature</h1>
            <p>A time signature indicates how we count rhythms in a measure. It’s given as a fraction, where the numerator signifies the number of beats or counts in a measure, while the denominator signifies which type of note gets the beat.</p>
            <div className="parent flex-parent">
                <div className="flex items-center justify-center relative w-48 h-24">
                    <Image 
                        alt="4-4 time signature" 
                        src="/app/images/4-4time.png" 
                        fill 
                        className="object-contain"
                    />
                </div>
                <div>
                    <p>This is the 4-4 time signature.</p>
                    <p>The numerator tells us there are 4 total beats in a measure, and the denominator tells us the quarter note will get the beat.</p>
                </div>
            </div>
            <h2>For example: </h2>
            <div className="flex items-center justify-center relative w-48 h-24">
                    <Image 
                        alt="4-4 time signature" 
                        src="/uploads/level0/tr_4quarters.png" 
                        fill 
                        className="object-contain"
                    />
            </div>
            <p>We count this as “1 2 3 4”</p>
            <p>Here’s why:</p>
            <p>The quarter note gets the beat, since “4” is the denominator of our time signature. Each time we see a quarter note, we increment our count. There are 4 quarter notes allowed in a measure, since “4” is the numerator of our time signature</p>

            <Link href='/exercises' className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Exercises
            </Link>
    
        </main>
      )
}