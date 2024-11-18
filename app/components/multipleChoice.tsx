/* multipleChoice.tsx

Load multiple choice buttons and communicate with backend
*/
import Image from "next/image"
import { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteEighth, mdiMusicNoteSixteenth, mdiMusicNoteWhole } from '@mdi/js';
import correctAnswer from "../common/levelNavigation";
import Cookies from "js-cookie";

type MultipleChoiceProps = {url:string};

/**
 * Parameters: 
 *      url:string - BE url for API call
 */
export default function MultipleChoice({ url }: MultipleChoiceProps) {
    const [imgUrl, setImgUrl] = useState("");
    const [answer, setAnswer] = useState("");
    const [level, setLevel] = useState(0);
    const [aiFeedback, setaiFeedback] = useState("");
    const [exerciseDescription, setDescription] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      // Declare a boolean flag that we can use to cancel the API request.
      let ignoreStaleRequest = false;
      // call BE to get next image
      fetch(url, { credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username: Cookies.get('username')
        })})
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          // If ignoreStaleRequest was set to true, we want to ignore the results of the
          // the request. Otherwise, update the state to trigger a new render.
          if (!ignoreStaleRequest) {
            console.log("setting exercise")
            setImgUrl(data.exercisePath);
            setAnswer(data.answer);
            setLevel(data.level);
            setDescription(data.textDescription);
            setExerciseType(data.exerciseType);
          }
        })
        .catch((error) => console.log(error));

      return () => {
        ignoreStaleRequest = true;
      };
    }, [url]);

    async function checkAnswer(studentAnswer: string) {
      if (studentAnswer == answer) {
        setaiFeedback("");
        setLoading(true);
        let data = await correctAnswer(exerciseType);
        // only update modified fields
        setImgUrl(data.exercisePath);
        setAnswer(data.answer);
        setDescription(data.textDescription);
        setLoading(false);
      }
      // if incorrect, call BE to get error message
      else {
        let ignoreStaleRequest = false;
        // prep info for prompt engineering
        var answerOptions = ["half note", "quarter note"];
        if(exerciseType == 'noteAddition'){  
          answerOptions.push("whole note");
          if(level > 0) { answerOptions.push('eigth note'); }
        }
        if(exerciseType == 'completeMeasure' && level > 0) { 
          answerOptions.push("eigth note"); 
          if(level > 1) { answerOptions.push('sixteenth note'); }
        }
        console.log(answerOptions);
        let body = { 
          selectedAnswer: studentAnswer,
          correctAnswer: answer,
          answerOptions: answerOptions,
          level: level,
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
            {/* {loading &&
              <div className="flex items-center justify-center text-center">
                <p>Great work! Loading next exercise...</p>
              </div>
            } */}
            {/** AI feedback */}
            {aiFeedback &&
              <div className="text-center w-2/3">
                <p>{aiFeedback}</p>
              </div>
            }
            {/** Multiple-Choice Buttons */}
            <div className="flex justify-around my-10 space-x-8">
                {exerciseType == "noteAddition" && 
                <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('whole')}
                >
                <Icon path={mdiMusicNoteWhole}
                  title="Whole note"
                  size={3}
                  color="black"
                />
                </button>}
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
                {level > 0 && <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('eighth')}>
                  <Icon path={mdiMusicNoteEighth}
                    title="Eigth note"
                    size={3}
                    color="black"
                  />
                </button> }        
                {exerciseType == "completeMeasure" && level > 1 && <button className="relative w-24 h-24 rounded-full outline outline-2 outline-black hover:outline-indigo-500"
                  onClick={() => checkAnswer('sixteenth')}
                >
                  <Icon path={mdiMusicNoteSixteenth}
                      title="Sixteenth note"
                      size={3}
                      color="black"
                    />
                </button> }
            </div>
        </div>
    )
}