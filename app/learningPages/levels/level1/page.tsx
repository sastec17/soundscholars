import Link from "next/link"
export default function Level1() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>TODO: Implement level 1 stuff - See Figma :p</p>

            {/** TODO: Link to exercise overview? Or just notation addition */}
            <Link href='/exercises/noteAddition' className="bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Exercises
            </Link>
    
        </main>
      )
}