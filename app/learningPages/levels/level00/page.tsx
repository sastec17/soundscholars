// Level00 page
import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteWhole, mdiMusicRestHalf, mdiMusicRestQuarter, mdiMusicRestWhole } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link"
export default function Level00() {
    const rows = [
        {
            "image": mdiMusicNoteQuarter,
            "name": "Quarter Note",
            "description": "This is called a quarter note. It takes up one beat in what's called a 4/4 time signature."
        },
        {
            "image": mdiMusicRestQuarter,
            "name": "Quarter Rest",
            "description": "This lasts as long as a quarter note, but signifies that no sound should be played."
        },
        {
            "image": mdiMusicNoteHalf,
            "name": "Half Note",
            "description": "This note lasts as long as two quarter notes. In 4/4 time signature, it will take up half the measure."
        },
        {
            "image": mdiMusicRestHalf,
            "name": "Half Rest",
            "description": "This lasts as long as a half note, but signifies that no sound should be played."
        },
        {
            "image": mdiMusicNoteWhole,
            "name": "Whole Note",
            "description": "This note lasts as long as four quarter notes or two half notes. In 4/4 time signature, it will take up the entire measure."
        },
        {
            "image": mdiMusicRestWhole,
            "name": "Whole Rest",
            "description": "This lasts as long as a whole note, but signifies that no sound should be played."
        }
    ];

    return (
        <main className="flex min-h-screen flex-col items-center space-y-10  p-24">
            <h1 className="text-3xl font-semibold mb-5">Level 0: Quarter, Half & Whole Notes + Rests</h1>
            <div>
            {rows.map((item) => (
                <div className="parent flex-parent">
                    <Icon path={item["image"]} title="Half note" size={3} color="black" />
                    <div>
                        <p>{item["name"]}</p>
                        <p>{item["description"]}</p>
                    </div>
                </div>
            ))}
            </div>
            <Link href='/learningPages/levels/level01/' className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Next Page
            </Link>
    
        </main>
      )
}