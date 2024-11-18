/* noteIdentification component
*/

"use client";
import Icon from '@mdi/react';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteEighth, mdiMusicNoteSixteenth, mdiMusicRestHalf, mdiMusicNoteWhole, mdiMusicRestWhole, mdiMusicRestQuarter, mdiMusicRestEighth, mdiMusicRestSixteenth, mdiMusicNoteHalfDotted, mdiMusicNoteQuarterDotted } from '@mdi/js';
import correctAnswer from '@/app/common/levelNavigation';
import ProgressBar from '@/app/components/progressBar';

const noteIdentificationMap = new Map<string, string>([
  ["quarter note", mdiMusicNoteQuarter],
  ["quarter rest", mdiMusicRestQuarter],
  ["half note", mdiMusicNoteHalf],
  ["half rest", mdiMusicRestHalf],
  ["whole note", mdiMusicNoteWhole],
  ["whole rest", mdiMusicRestWhole],
  ["eighth note", mdiMusicNoteEighth],
  ["eighth rest", mdiMusicRestEighth],
  ["dotted half note", mdiMusicNoteHalfDotted],
  ["dotted quarter note", mdiMusicNoteQuarterDotted]
  // ["sixteenth note", mdiMusicNoteSixteenth],
  // ["sixteenth rest", mdiMusicRestSixteenth]
]);

export default function noteIdentification() {
  const [icon, setIcon] = useState("");
  const [img, setImg] = useState("");
  const [response, setResponse] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [aiFeedback, setaiFeedback] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [symbolName, setSymbolName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [timeSignature, setTimeSignature] = useState("")
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [threshold, setThreshold] = useState(0);

  function setNewQuestion(symbolName: string, answer: string, level: number, timeSignature: string, image: string) {
    var format = Math.floor(Math.random() * 2);
    if(image != "") { // dont show the "symbol name" version for more complex notes (only # beats)
      format = 1;
    }
    const icon = noteIdentificationMap.get(String(symbolName));
    if(icon != null) {
      setIcon(icon);
    } else {
      setImg(image);
    }
    setAnswer(answer);
    setLevel(level);
    setSymbolName(symbolName);
    setExerciseType('noteIdentification');
    setResponse("");
    if(format == 0) { 
      setExerciseDescription("Given a note/rest identify the name of that note."); 
      setPrompt("Symbol Name: ")
      setTimeSignature("");
      setFormat(0);
    } else { 
      setExerciseDescription("Given a note/rest and time signature, identify the length (how many beats it would occupy) of that note."); 
      setTimeSignature(timeSignature);
      setPrompt("# Beats:");
      setFormat(1);
    }
  }
  useEffect(() => {
    let ignoreStaleRequest = false;
    fetch('/api/noteIdentification',{ 
        credentials: "same-origin",
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
        if(JSON.stringify(data) === "{}") {
          window.location.href = '/exercises';
        }
        if (!ignoreStaleRequest) {
          setNewQuestion(data.exercise.textDescription, data.exercise.answer, data.exercise.level, data.exercise.timeSignature, data.exercise.exercisePath);
          setProgress(data.exerciseProgress);
          setThreshold(data.threshold);
        }
      })
      .catch((error) => console.log(error));
      return () => {
        ignoreStaleRequest = true;
      };
  }, [])

  async function handleSubmit() {
    let correct = format == 0 ? symbolName : answer;
    if(response == correct) { // note name
      console.log(response, symbolName)
      setaiFeedback("");
      let data = await correctAnswer(exerciseType);
      // only set modified vars
      setNewQuestion(data.exercise.textDescription, data.exercise.answer, level, data.exercise.timeSignature, data.exercise.exercisePath);
      setProgress(data.exerciseProgress);
    } else {
      let ignoreStaleRequest = false;
      let body = {
        selectedAnswer: response,
        correctAnswer: correct,
        level: level, 
        answerOptions: '',
        exerciseType: exerciseType
      }
      setResponse("");
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

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <h1 className="text-3xl font-semibold mb-5">Note Identification</h1> 
      <p className="w-1/2 text-center">{exerciseDescription}</p>
      <div className='parent flex-parent'>
        {timeSignature && 
          <p className='flex flex-col justify-center font-bold text-xl'>{timeSignature}</p>
        }
        {icon && 
          <div className="flex items-center justify-center relative w-48 h-24">
            {icon && <Icon path={icon} size={3} color="black" /> }
          </div>
        }
        {img &&
          <div className="flex items-center justify-center relative w-48 h-24">
            {img /* && <Image 
              // alt="Exercise Image" 
              // src={img} 
              // className="object-contain"
            /> */}
          </div>
        }
        {/* {!icon &&
          <div className="flex items-center justify-center text-center">
            <p>Loading image...</p>
          </div>
        } */}
      </div>
      {aiFeedback &&
        <div className="text-center w-2/3">
          <p>{aiFeedback}</p>
        </div>
      }
      <form className="flex my-10 space-x-8">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">{prompt}</label>
          <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rhythm" type="text" placeholder=""
            onChange={(ev) => setResponse(ev.target.value)}
            value={response} 
          />
        </div>
        <button onClick={() => handleSubmit()} className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"> Submit </button>
      </form>
      <ProgressBar progress={progress} threshold={threshold} />
    </main>
  )
}