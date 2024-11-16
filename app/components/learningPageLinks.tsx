"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LearningPageLinks() {

    const [learningPages, setLearningPages] = useState([]);

    useEffect(() => {
        fetch("/api/getLearningPages", { credentials: "same-origin" })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
                console.log(data);
                setLearningPages(data);
        })
    }, []);

    function getLink(level: string, pageIndex: string) {
        return "learningPages/levels/level"+level+pageIndex;
    }
    
    return (
        <div>
            {learningPages.map((item, i) => (
                <div key={i}>
                    <u><Link href={getLink(item["level"], item["pageIndex"])}>
                    {item["title"]}
                    </Link></u>
                </div>
            ))}
        </div>
    )

}