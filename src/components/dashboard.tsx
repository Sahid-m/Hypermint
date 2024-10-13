'use client'
import { useState, useEffect } from 'react'
import { Menu, X, Search, Plus, Sparkles, Wallet } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function DashboardComponent() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">

      <main className="pt-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500 mb-8">
            Welcome to HyperMint
          </h1>

          <div className="flex justify-center mb-12">
            <Link href='/token' className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
              <Plus className="inline-block mr-2" size={20} />
              Create a new token
            </Link>
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
                    <Link href='/trade' className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 flex items-center justify-center">
                      <Sparkles className="mr-1" size={16} />
                      Trade
                    </Link>
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

export function NavLink({ href, children, onClick }:any ) {
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