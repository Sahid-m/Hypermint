"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import ProfileIcon from './emoji-funny-circle-svgrepo-com.svg'

type Coin = {
  id: string
  name: string
  ticker: string
  initialPrice: number
  launchTime: Date
  imageUrl: string
}

const NewCoinsDashboardComponent = () => {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      const newCoin: Coin = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Meme Coin ${Math.floor(Math.random() * 1000)}`,
        ticker: `MC${Math.floor(Math.random() * 1000)}`,
        initialPrice: parseFloat((Math.random() * 10).toFixed(4)),
        launchTime: new Date(),
        imageUrl: `/placeholder.svg?height=32&width=32`
      }
      setCoins(prevCoins => [newCoin, ...prevCoins].slice(0, 100)) // Keep only the latest 100 coins
    }, 5000) // Add a new coin every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        <main className="pt-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
            <CardTitle className="text-2xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500 mb-8">Newly Published Coins</CardTitle>
            </CardHeader>
            <CardContent>
            <ScrollArea className="h-[70vh]">
                <Table>
                <TableHeader>
                    <TableRow>
                  <TableHead className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Token</TableHead>
                  <TableHead className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Ticker</TableHead>
                  <TableHead className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Initial Price</TableHead>
                  <TableHead className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Launch Time</TableHead>
                  <TableHead className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coins.map((coin) => (
                  <TableRow key={coin.id} className="border-b border-gray-700">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={ProfileIcon}
                          alt={coin.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-lime-300">{coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-yellow-300">{coin.ticker}</TableCell>
                    <TableCell className="text-green-300">${coin.initialPrice.toFixed(4)}</TableCell>
                    <TableCell className="text-orange-300">{formatTime(coin.launchTime)}</TableCell>
                    <TableCell>
                      <Badge className="bg-pink-500 text-white">New</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
        </div>
      </main>
    </div>
  )
}

export default NewCoinsDashboardComponent