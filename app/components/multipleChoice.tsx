/* multipleChoice.tsx

Load multiple choice buttons and communicate with backend

Invoked by:
    - completeMeasure/page.tsx
*/
import Image from "next/image"

export default function MultipleChoice() {
    return(
        <div style={{ position: "relative", width: "100px", height: "100px" }} >
        <Image 
                alt="half note" 
                src="/app/images/half_note.png" 
                fill 
                style={{ objectFit: "contain" }}
            />
        </div>
    )
}