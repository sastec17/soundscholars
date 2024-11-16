/* noteIdentification component
*/

"use client";
import Icon from '@mdi/react';
import { useEffect, useState } from "react";
import { mdiMusicNoteHalf, mdiMusicNoteQuarter, mdiMusicNoteEighth, mdiMusicNoteSixteenth, mdiMusicRestHalf, mdiMusicNoteWhole, mdiMusicRestWhole } from '@mdi/js';

const noteIdentificationMap = new Map<string, string>([
  ["quarter note", mdiMusicNoteQuarter],
  ["quarter rest", mdiMusicRestHalf],
  ["half note", mdiMusicNoteHalf],
  ["half rest", mdiMusicRestHalf],
  ["whole note", mdiMusicNoteWhole],
  ["whole rest", mdiMusicRestWhole]
]);

export default function noteIdentification() {
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [aiFeedback, setaiFeedback] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [description, setDescription] = useState("");
  const [timeSignature, setTimeSignature] = useState("")
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    let ignoreStaleRequest = false;
    fetch('/api/noteIdentification',{ credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        
        if (!ignoreStaleRequest) {
          const format = Math.floor(Math.random() * 2);
          const img = noteIdentificationMap.get(String(data.textDescription));
          if(img != null) {
            setIcon(img);
          }
          setAnswer(data.answer);
          setLevel(data.level);
          setExerciseDescription(data.textDescription);
          if(format == 0) { 
            setDescription("Given a note/rest identify the name of that note."); 
            setPrompt("Note Name: ")
          } else { 
            setDescription("Given a note/rest and time signature, identify the length (how many beats it would occupy) of that note."); 
            setTimeSignature("4/4");
            setPrompt("# Beats:");
          }
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

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <h1 className="text-3xl font-semibold mb-5">Note Identification</h1> 
      <p className="w-1/2 text-center">{description}</p>
      <div className='parent flex-parent'>
        {timeSignature && 
          timeSignature
        }
        {icon && 
          <div className="flex items-center justify-center relative w-48 h-24">
            {icon && <Icon path={icon} title={exerciseDescription} size={3} color="black" /> }
          </div>
        }
        {!icon &&
          <div className="flex items-center justify-center text-center">
            <p>Loading image...</p>
          </div>
        }
      </div>

      <form className="flex my-10 space-x-8">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">{prompt}</label>
          <input  
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rhythm" type="text" placeholder=""
            onChange={(ev) => setResponse(ev.target.value)}
            value={response} 
          />
        </div>
        <button className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"> Submit </button>
      </form>
    </main>
  )
}