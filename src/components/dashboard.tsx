'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search, Plus, Sparkles, Wallet } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function DashboardComponent() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <nav
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
                    ${isScrolled ? 'w-11/12 md:w-3/4 mt-2' : 'w-full md:w-3/4'}
                    h-16 backdrop-blur-md bg-gray-800/80 border border-gray-700/50
                    rounded-full flex items-center justify-between px-4 md:px-6`}
      >
        <Link href="/" className="text-xl md:text-2xl font-bold text-violet-400">
          HyperMint
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/tokens">Tokens</NavLink>
          <NavLink href="/marketplace">Marketplace</NavLink>
          <NavLink href="/profile">Profile</NavLink>
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
              <NavLink href="/" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
              <NavLink href="/tokens" onClick={() => setIsMenuOpen(false)}>Tokens</NavLink>
              <NavLink href="/marketplace" onClick={() => setIsMenuOpen(false)}>Marketplace</NavLink>
              <NavLink href="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
              <button className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
                <Wallet className="mr-2" size={18} />
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500 mb-8">
            Welcome to HyperMint
          </h1>

          <div className="flex justify-center mb-12">
            <button className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
              <Plus className="inline-block mr-2" size={20} />
              Create a new token
            </button>
          </div>

          <div className="relative mb-12">
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full py-4 px-6 pl-14 bg-gray-700/50 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, name: "CryptoKitty", image: "" },
              { id: 2, name: "Bored Ape", image: "" },
              { id: 3, name: "Punk", image: "" },
              { id: 4, name: "Azuki", image: "" },
              { id: 5, name: "Doodle", image: "" },
              { id: 6, name: "Cool Cat", image: "" },
            ].map((token) => (
              <div key={token.id} className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                <div className="pt-4 px-4">
                  <div className="aspect-square w-full max-w-[200px] mx-auto relative">
                    <Image
                      src={token.image}
                      alt={token.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-semibold mb-2">{token.name} #{token.id}</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <span className="text-violet-400 font-medium">1000 HYPR</span>
                    <button className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 flex items-center justify-center">
                      <Sparkles className="mr-1" size={16} />
                      Trade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function NavLink({ href, children, onClick } ) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-violet-400 transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}