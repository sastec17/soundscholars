/* completeMeasure component
*/
"use client";
import MultipleChoice from "@/app/components/multipleChoice"



export default function completeMeasure() {

    return (
      <main className="flex min-h-screen flex-col items-center pt-24">
         <h1 className="text-3xl font-semibold mb-5">Complete the Measure</h1>
         <p className="w-1/2 text-center">Given the following <b>incomplete</b> measure, select the note length 
         that should replace the question mark to complete the measure.
         </p>
         <MultipleChoice url="/api/completeTheMeasure"></MultipleChoice>
      </main>
    )
  }
  