/* noteAddition component
*/
"use client";
import MultipleChoice from "@/app/components/multipleChoice"

export default function noteAddition() {

    return (
      <main className="flex min-h-screen flex-col items-center pt-24">
         <h1 className="text-3xl font-semibold mb-5">Note Addition</h1>
         <p className="w-1/2 text-center">Given a set of <i>notes</i>, identify the <i>single</i> note that has the same total length.</p>
         <MultipleChoice url="/api/noteAddition"></MultipleChoice>
      </main>
    )
  }
  