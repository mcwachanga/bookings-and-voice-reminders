import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appointment Booking App",
  description: "Powered by Twilio Voices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-100"}>
        <nav className="flex items-center justify-between flex-wrap bg-twilio-red p-3">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
           <span className="font-semibold text-xl tracking-tight">
              Appointments
            </span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link
                href="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-100 mr-4"
              >
                Upcoming
              </Link>
              
            </div>
            <div>
              <Link
                href="/book"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
