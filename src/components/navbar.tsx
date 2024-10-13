'use client';

import { useState, useEffect } from 'react'
import { Menu, X, Search, Plus, Sparkles, Wallet } from 'lucide-react'
import Link from 'next/link'
import { NavLink } from './dashboard';

export default function Navigation(){

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [])

    return (
        <nav
        className={`fixed top-3 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
                    ${isScrolled ? 'w-11/12 md:w-3/4 mt-2' : 'w-full md:w-3/4'}
                    h-16 backdrop-blur-md bg-gray-800/80 border border-gray-700/50
                    rounded-full flex items-center justify-between px-4 md:px-6`}
      >
        <Link href="/" className="text-xl md:text-2xl font-bold text-violet-400">
          HyperMint
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/aboutus">About Us</NavLink>
        </div>

        <button className="hidden md:flex items-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
          <Wallet className="mr-2" size={18} />
          Connect Wallet
        </button>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gray-800/95 backdrop-blur-md p-4 rounded-b-3xl">
            <div className="flex flex-col space-y-4">
              <NavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink href="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
              <button className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
                <Wallet className="mr-2" size={18} />
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>
    )
}