"use client";
import '../globals.css'
import Navbar from '../components/navbar'
import { usePathname } from 'next/navigation';

export default function ExerciseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/exercises'
  return (
        <div className="flex flex-col overflow-x-clip">
          {showNavbar && <Navbar />}
          <main className="flex flex-grow flex-col">{children}</main>
        </div>
  )
}
