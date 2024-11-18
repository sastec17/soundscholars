// Level20 page
import { mdiMusicNoteHalfDotted, mdiMusicNoteQuarterDotted,  mdiMusicNoteEighthDotted} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link"
export default function Level20() {
    const rows = [
        {
            "image": mdiMusicNoteHalfDotted,
            "name": "Dotted Half Note",
            "description": "This note lasts as long as three quarter notes."
        },
        {
            "image": mdiMusicNoteQuarterDotted,
            "name": "Dotted Quarter Note",
            "description": "This is a dotted quarter note. It takes up one and a half beats in a 4/4 time signature."
        },
        // {
        //     "image": mdiMusicNoteEighthDotted,
        //     "name": "Dotted Eighth Note",
        //     "description": "This note lasts as long as 1.5 eighth notes, or 0.75 quarter notes. We'll revisit this one later!"
        // },
        
    ];

    return (
        <main className="flex min-h-screen flex-col items-center space-y-10  p-24">
            <h1 className="text-3xl font-semibold mb-5">Level 2: Dotted Notes and Rests</h1>
            <p className="w-1/2 text-center"><b>Key Idea: </b>Adding a dot after a note or a rest <b>adds half its original value.</b> See examples of dotted notes below:</p>
            <div>
            {rows.map((item) => (
                <div className="parent flex-parent">
                    <Icon path={item["image"]} title="Note or Rest Image" size={3} color="black" />
                    <div>
                        <p>{item["name"]}</p>
                        <p>{item["description"]}</p>
                    </div>
                </div>
            ))}
            </div>
            <Link href='/learningPages/levels/level21/' className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Next Page
            </Link>
    
        </main>
      )
}