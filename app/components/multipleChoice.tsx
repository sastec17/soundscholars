/* multipleChoice.tsx

Load multiple choice buttons and communicate with backend

Invoked by:
    - completeMeasure/page.tsx
*/
import Image from "next/image"
import { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteEighth, mdiMusicNoteSixteenth } from '@mdi/js';

type MultipleChoiceProps = {url:string};

/**
 * Parameters: 
 *      url:string - BE url for API call
 */
export default function MultipleChoice({ url }: MultipleChoiceProps) {
    const [imgUrl, setImgUrl] = useState("");
    const [answer, setAnswer] = useState("");
    const[level, setLevel] = useState(0);
    const [aiFeedback, setaiFeedback] = useState("");
    const [exerciseDescription, setDescription] = useState("");
    const [exerciseType, setExerciseType] = useState("");
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
            setLevel(data.level);
            setDescription(data.textDescription);
            setExerciseType(data.exerciseType);
          }
        })
        .catch((error) => console.log(error));

      return () => {
        // This is a cleanup function that runs whenever the component
        // unmounts or re-renders. If a Post is about to unmount or re-render, we
        // should avoid updating state.
        ignoreStaleRequest = true;
      };
    }, [url]);

    function checkAnswer(studentAnswer: string) {
      // TODO: IMPLEMENT LOGIC FOR CORRECT ANSWER HERE
      if (studentAnswer == answer) {
        setaiFeedback("")
        console.log('well done!')
      }
      // if incorrect, call BE to get error message
      else {
        let ignoreStaleRequest = false;
        // prep info for prompt engineering
        let body = { 
          studentAnswer: studentAnswer,
          level: level,
          description: exerciseDescription,
          exerciseType: exerciseType
        }
        fetch('/api/getFeedback', 
          {
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
          })
          .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          }).then((data) => {
            if (!ignoreStaleRequest) {
              setaiFeedback(data.feedback);
            }
          })
          .catch((error) => console.log(error));
          return () => {
            ignoreStaleRequest = true;
          };
      }
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
            {/** AI feedback */}
            {aiFeedback &&
              <div className="text-center">
                <p>{aiFeedback}</p>
              </div>
            }
            {/** Multiple-Choice Buttons */}
            <div className="flex justify-around my-10 space-x-8">
                <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('half')}
                >
                <Icon path={mdiMusicNoteHalf}
                  title="Half note"
                  size={3}
                  color="black"
                />
                </button>
                <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('quarter')}
                >
                <Icon path={mdiMusicNoteQuarter}
                  title="Quarter note"
                  size={3}
                  color="black"
                />
                </button>            
                <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('eighth')}>
                  <Icon path={mdiMusicNoteEighth}
                    title="Eigth note"
                    size={3}
                    color="black"
                  />
                </button>            
                <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('sixteenth')}
                >
                  <Icon path={mdiMusicNoteSixteenth}
                      title="Sixteenth note"
                      size={3}
                      color="black"
                    />
                </button>
            </div>
        </div>
    )
}