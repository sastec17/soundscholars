/* noteIdentification component
*/

"use client";
import Icon from '@mdi/react';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteEighth, mdiMusicNoteSixteenth, mdiMusicRestHalf, mdiMusicNoteWhole, mdiMusicRestWhole, mdiMusicRestQuarter, mdiMusicRestEighth, mdiMusicRestSixteenth } from '@mdi/js';
import correctAnswer from '@/app/common/levelNavigation';

const noteIdentificationMap = new Map<string, string>([
  ["quarter note", mdiMusicNoteQuarter],
  ["quarter rest", mdiMusicRestQuarter],
  ["half note", mdiMusicNoteHalf],
  ["half rest", mdiMusicRestHalf],
  ["whole note", mdiMusicNoteWhole],
  ["whole rest", mdiMusicRestWhole],
  ["eigth note", mdiMusicNoteEighth],
  ["eight rest", mdiMusicRestEighth],
  ["sixteenth note", mdiMusicNoteSixteenth],
  ["sixteenth rest", mdiMusicRestSixteenth]
]);

export default function noteIdentification() {
  const [icon, setIcon] = useState("");
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
  const [loading, setLoading] = useState(false);

  function setNewQuestion(symbolName: string, answer: string, level: number) {
    const format = Math.floor(Math.random() * 2);
    const img = noteIdentificationMap.get(String(symbolName));
    if(img != null) {
      setIcon(img);
    }
    setAnswer(answer);
    setLevel(level);
    setSymbolName(symbolName);
    setExerciseType('noteIdentification');
    setResponse("");
    if(format == 0) { 
      setExerciseDescription("Given a note/rest identify the name of that note."); 
      setPrompt("Symbol Name: ")
      setFormat(0);
    } else { 
      setExerciseDescription("Given a note/rest and time signature, identify the length (how many beats it would occupy) of that note."); 
      setTimeSignature("4/4");
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
        
        if (!ignoreStaleRequest) {
          setNewQuestion(data.textDescription, data.answer, data.level);
        }
      })
      .catch((error) => console.log(error));
      return () => {
        // This is a cleanup function that runs whenever the component
        // unmounts or re-renders. If a Post is about to unmount or re-render, we
        // should avoid updating state.
        ignoreStaleRequest = true;
      };
  }, [])

  async function handleSubmit() {
    console.log(format);
    let correct = format == 0 ? symbolName : answer;
    if(response == correct) { // note name
      console.log(response, symbolName)
      console.log("correct!")
      setaiFeedback("");
      setLoading(true);
      let data = await correctAnswer(exerciseType);
      // only set modified vars
      setNewQuestion(data.textDescription, data.answer, level);
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
          timeSignature
        }
        {icon && 
          <div className="flex items-center justify-center relative w-48 h-24">
            {icon && <Icon path={icon} size={3} color="black" /> }
          </div>
        }
        {!icon &&
          <div className="flex items-center justify-center text-center">
            <p>Loading image...</p>
          </div>
        }
        {/* {loading && 
          <div className="flex items-center justify-center text-center">
            <p>Great work! Loading next exercise...</p>
          </div>
        } */}
      </div>
      {aiFeedback &&
        <div className="text-center">
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
    </main>
  )
}