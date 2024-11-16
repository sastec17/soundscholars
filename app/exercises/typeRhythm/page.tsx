/* typeRhythm component
*/
"use client";
import { useEffect, useState } from "react";
import Image from "next/image"

export default function TypeRhythm() {
  const [rhythm, setRhythm] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [answer, setAnswer] = useState("");
  const[level, setLevel] = useState(0);
  const [aiFeedback, setaiFeedback] = useState("");
  const [exerciseDescription, setDescription] = useState("");

  useEffect(() => {
    let ignoreStaleRequest = false;
    fetch('/api/typeThatRhythm',{ credentials: "same-origin" })
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
        <h1 className="text-3xl font-semibold mb-5">Type that Rhythm</h1>
        <p className="w-1/2 text-center">Given the following measure, type the corresponding rhythm.
        See recommended notation below.
        </p>

        <div>
            {imgUrl && 
              <div className="flex items-center justify-center relative w-48 h-24">
              <Image 
                  alt="Type that rhythm exercise image" 
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
        </div>
        <form className="flex my-10 space-x-8">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rhythm:
            </label>
            <input  
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rhythm" type="text" placeholder="1 2 3 4"
              onChange={(ev) => setRhythm(ev.target.value)}
              value={rhythm} 
            ></input>
          </div>
          <button className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        </form>
    </main>
  )
}
  