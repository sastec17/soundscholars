import '/Users/sarahstec/Downloads/AIED/soundscholars/app/globals.css'
import Navbar from '../components/navbar'


export default function ExerciseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="flex flex-col overflow-x-clip">
          <Navbar />
          <main className="flex flex-grow flex-col">{children}</main>
        </div>
  )
}
