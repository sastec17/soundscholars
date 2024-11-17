// Level01 page
import { mdiMusicNoteEighth, mdiMusicRestEighth, mdiMusic} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link"
export default function Level01() {
    const rows = [
        {
            "image": mdiMusicNoteEighth,
            "name": "Eighth Note",
            "description": "This note lasts as long as half a quarter note. In 4/4 time signature, it will take up 1/8th the measure."
        },
        {
            "image": mdiMusicRestEighth,
            "name": "Eighth Rest",
            "description": "This lasts as long as an eighth note, but signifies that no sound should be played."
        }
    ];

    return (
        <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
            <h1 className="text-3xl font-semibold mb-5">Level 1: Eighth Notes + Rests</h1>
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
            <div className="flex flex-col items-center">
                <p><b>Important:</b> Two eighth notes stemmed together will look like this:</p>
                <Icon path={mdiMusic} title="Two eighth notes" size={3} color="black"/>
            </div>
            <Link href='/learningPages/levels/level11/' className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Next Page
            </Link>
    
        </main>
      )
}