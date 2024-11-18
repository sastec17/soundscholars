"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LearningPageLinks() {

    const [learningPages, setLearningPages] = useState([[]]);

    useEffect(() => {
        fetch("/api/getLearningPages", { credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: Cookies.get('username')
            })
        })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            var pages = [];
            var level = 0;
            var curr_pages: string[] = [];
            data.map((item: any) => {
                if(item.level == level) {
                    curr_pages.push(item.title);
                } else {
                    pages.push(curr_pages);
                    curr_pages = [item.title];
                    level += 1;
                }
            });
            pages.push(curr_pages);
            setLearningPages(pages);
        })
    }, []);

    function getLink(level: string, pageIndex: string) {
        return "learningPages/levels/level"+level+pageIndex;
    }
    
    return (
        <div>
            <div className='flex flex-col space-y-10 pt-10'>
            {learningPages.map((pages, level) => (
                <div>
                    <p>Level {level.toString()}</p>
                <div key={level} className="flex items-center space-x-10 items-stretch">
                    
                    {pages.map((item, i) => (
                        <div key={i} className={'flex-1 py-4 px-3 bg-indigo-300 rounded-md text-center hover:bg-indigo-500'}>
                            <Link href={getLink(level.toString(), item)}>
                            {item}
                            </Link>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
    )

}