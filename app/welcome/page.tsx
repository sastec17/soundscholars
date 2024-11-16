// Welcome component. See Figma for design
import Link from "next/link"
export default function Welcome() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>TODO: Implement welcome splash screen - See Figma :p</p>

            {/** TODO: Link to learning page 0 */}
            <Link href='/learningPages/levels/level0' className="bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Get Started
            </Link>
    
        </main>
      )
}