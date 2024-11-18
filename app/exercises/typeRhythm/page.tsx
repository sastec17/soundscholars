/* typeRhythm component
*/
"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
import Cookies from "js-cookie";
import correctAnswer from '@/app/common/levelNavigation';
import ProgressBar from '@/app/components/progressBar';

export default function TypeRhythm() {
  const [rhythm, setRhythm] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [aiFeedback, setaiFeedback] = useState("");
  const [exerciseDescription, setDescription] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [progress, setProgress] = useState(0);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    let ignoreStaleRequest = false;
    fetch('/api/typeThatRhythm',{ 
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
        // If ignoreStaleRequest was set to true, we want to ignore the results of the
        // the request. Otherwise, update the state to trigger a new render.
        if (!ignoreStaleRequest) {
          setImgUrl(data.exercise.exercisePath);
          setAnswer(data.exercise.answer);
          setLevel(data.exercise.level);
          setDescription(data.exercise.textDescription);
          setExerciseType(data.exercise.exerciseType);
          setProgress(data.exerciseProgress);
          setThreshold(data.threshold);
        }
      })
      .catch((error) => console.log(error));
      return () => {
        ignoreStaleRequest = true;
      };
  }, [])

  async function checkAnswer() {
    // strip student answer of whitespace
    const student_answer = rhythm.replace(/\s/g, '');
    setRhythm("");
    if (student_answer == answer) {
      console.log('correct!')
      setaiFeedback("");
      let data = await correctAnswer(exerciseType);

      // only update modified fields
      setImgUrl(data.exercise.exercisePath);
      setAnswer(data.exercise.answer);
      setDescription(data.exercise.textDescription);
      setProgress(data.exerciseProgress);
    }
    else {
      let ignoreStaleRequest = false;
      let body = { 
        selectedAnswer: student_answer,
        correctAnswer: answer,
        answerOptions: '',
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

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
        <h1 className="text-3xl font-semibold mb-5">Type that Rhythm</h1>
        <p className="w-1/2 text-center">Given the following measure, type the corresponding rhythm.</p>
        <p className="w-1/2 text-center">Please only write beats where an articulation occurs, or when a new pitch is "started."</p>
        {level > 0 &&
              <p className="w-1/2 text-center mt-5"><b>Notation Tip: </b>Denote eighth note divisions with "+"s. (i.e. two eighth notes = '1+')</p>
        }
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
        {/** AI feedback */}
          {aiFeedback &&
            <div className="text-center w-2/3">
                <p>{aiFeedback}</p>
            </div>
          }
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
          <button type='button' onClick={()=>checkAnswer()} className="bg-indigo-300 hover:bg-indigo-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
        <ProgressBar progress={progress} threshold={threshold} />
    </main>
  )
}
  