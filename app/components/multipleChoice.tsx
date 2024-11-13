/* multipleChoice.tsx

Load multiple choice buttons and communicate with backend

Invoked by:
    - completeMeasure/page.tsx
*/
import Image from "next/image"
import { useEffect, useState } from "react";

type MultipleChoiceProps = {url:string};

/**
 * Parameters: 
 *      url:string - BE url for API call
 */
export default function MultipleChoice({ url }: MultipleChoiceProps) {
    const [imgUrl, setImgUrl] = useState("");
    const [answer, setAnswer] = useState("");
    const [aiFeedback, setaiFeedback] = useState("");
    // TODO: GET USEEFFECT TO TRIGGER WHEN USER GETS SOMETHING RIGHT
    useEffect(() => {
      // Declare a boolean flag that we can use to cancel the API request.
      let ignoreStaleRequest = false;
      // call BE to get next image
      fetch(url, { credentials: "same-origin" })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          // If ignoreStaleRequest was set to true, we want to ignore the results of the
          // the request. Otherwise, update the state to trigger a new render.
          if (!ignoreStaleRequest) {
            setImgUrl(data.exercisePath);
            setAnswer(data.answer);
          }
        })
        .catch((error) => console.log(error));

      return () => {
        // This is a cleanup function that runs whenever the Post component
        // unmounts or re-renders. If a Post is about to unmount or re-render, we
        // should avoid updating state.
        ignoreStaleRequest = true;
      };
    }, [url]);

    function checkAnswer(studentAnswer: string) {
      // TODO: IMPLEMENT LOGIC FOR ANSWER CORRECTION HERE

      // if correct, trigger useEffect OR put useEffect contents in function
      // and call function from within useEffect + call function here

      // if incorrect, call BE to get error message
    }
    return(
        <div className="flex flex-col items-center">
            {/** TODO: ONLY LOAD WHEN imgUrl is not "" */}
            {/** Exercise */}
            {imgUrl &&
              <div className="flex items-center justify-center relative w-48 h-24">
                <Image 
                    alt="Exercise Image" 
                    src={imgUrl} 
                    fill 
                    className="object-contain"
                />
              </div>
            }
            {!imgUrl &&
              <div className="flex items-center justify-center text-center">
                <p>Loading image...</p>
              </div>
            }
            {/** Multiple-Choice Buttons */}
            <div className="flex justify-around m-10">
                <button className="relative w-24 h-24">
                    <Image 
                            className="object-contain"
                            alt="half note" 
                            src="/app/images/half_note.png" 
                            fill 
                        />
                </button>
                <button className="relative w-24 h-24"
                onClick={() => checkAnswer('quarter')}
                >
                    <Image 
                            className="object-contain"
                            alt="half note" 
                            src="/app/images/quarter_note.png" 
                            fill 
                        />
                </button>            
                <button className="relative w-24 h-24">
                    <Image 
                            className="object-contain"
                            alt="half note" 
                            src="/app/images/half_note.png" 
                            fill 
                        />
                </button>            
                <button className="relative w-24 h-24">
                    <Image 
                            className="object-contain"
                            alt="half note" 
                            src="/app/images/half_note.png" 
                            fill 
                        />
                </button>
            </div>
        </div>
    )
}