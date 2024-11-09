/* navbar.tsx
Sticky navbar that persists across main pages

TODO: Make navbar go away when viewing splash page - use separate layout/nest?

Referenced in: layout.tsx
*/
import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="sticky top-0 left-0 z-50 w-full text-black py-4">
        <div className="md:px-8">
            {/** Top NavBar */}
            <section className="flex justify-between items-center">
                <Link href='/' className="text-xl font-bold">
                    SoundScholars
                </Link>
                <div className="space-x-8">
                    <Link href="/about" className="text-lg font-semibold hover:underline">
                        About
                    </Link>
                    <Link href="/learningPages" className="text-lg font-semibold hover:underline">
                        Learning Pages
                    </Link>
                </div>
            </section>
        </div>
        <div className="w-full flex justify-center items-center bg-indigo-300 md:px-8 py-2">
          {/* Links to Exercises */}
          <section className="flex justify-center space-x-12 text-lg font-medium">
            <Link href="/exercises/noteAddition" className="hover:underline">
              Note Addition
            </Link>
            <Link href="/exercises/notationIdentification" className="hover:underline">
              Notation Identification
            </Link>
            <Link href="/exercises/completeMeasure" className="hover:underline">
              Complete the Measure
            </Link>
            <Link href="/exercises/typeRhythm" className="hover:underline">
              Type that Rhythm
            </Link>
          </section>
        </div>
      </nav>
    );
  }