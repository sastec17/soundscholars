/* multipleChoice.tsx

Load multiple choice buttons and communicate with backend

Invoked by:
    - completeMeasure/page.tsx
*/
import Image from "next/image"

export default function MultipleChoice() {
    return(
        <div className="flex justify-around m-10">
            <button className="relative w-24 h-24">
                <Image 
                        className="rounded-b-lg"
                        alt="half note" 
                        src="/app/images/half_note.png" 
                        fill 
                        style={{ objectFit: "contain" }}
                    />
            </button>
            <button className="relative w-24 h-24">
                <Image 
                        className="rounded-b-lg"
                        alt="half note" 
                        src="/app/images/half_note.png" 
                        fill 
                        style={{ objectFit: "contain" }}
                    />
            </button>            
            <button className="relative w-24 h-24">
                <Image 
                        className="rounded-b-lg"
                        alt="half note" 
                        src="/app/images/half_note.png" 
                        fill 
                        style={{ objectFit: "contain" }}
                    />
            </button>            
            <button className="relative w-24 h-24">
                <Image 
                        className="rounded-b-lg"
                        alt="half note" 
                        src="/app/images/half_note.png" 
                        fill 
                        style={{ objectFit: "contain" }}
                    />
            </button>
        </div>
    )
}