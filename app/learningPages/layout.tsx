/**
 * layout for learning pages
 */
import Link from "next/link"

export default function LearningLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <nav className="sticky top-0 left-0 z-50 w-full text-black py-4">
                <div className="md:px-8">
                {/** Top NavBar */}
                <section className="flex justify-between items-center">
                    <Link href='/exercises' className="text-xl font-bold">
                        SoundScholars
                    </Link>
                    <div className="space-x-8">
                        <Link href="/about" className="text-lg font-semibold hover:underline">
                            About
                        </Link>
                        <Link href="/exercises" className="text-lg font-semibold hover:underline">
                            Exercises
                        </Link>
                        <Link href="/logout" className="text-lg font-semibold hover:underline">
                            Logout
                        </Link>
                    </div>
                </section>
            </div>
        </nav>
        <main className="flex flex-grow flex-col">{children}</main>
        </div>
    )
}