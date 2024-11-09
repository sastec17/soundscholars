import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SoundScholars',
  description: 'Learn musical rhythms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-full`}>
        <div className="flex flex-col overflow-x-clip">
          <Navbar />
          <main className="flex flex-grow flex-col">{children}</main>
        </div>
      </body>
    </html>
  )
}
