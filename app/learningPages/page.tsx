"use client";
import LearningPageLinks from "@/app/components/learningPageLinks";

export default function LearningPages() {
    return(
        <main className="flex min-h-screen flex-col items-center pt-24">
        <h1 className="text-3xl font-semibold mb-5">Learning Pages</h1>
        <LearningPageLinks></LearningPageLinks>
     </main>
    )
}