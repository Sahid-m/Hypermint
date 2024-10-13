"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DollarSign, TrendingUp, Users, Send } from 'lucide-react'

const UpdatedDashboard = () => {
  const [tradeAmount, setTradeAmount] = useState('0.0')
  const [isBuyMode, setIsBuyMode] = useState(true)
  const [messages, setMessages] = useState([
    { id: 1, user: 'MoonWalker', content: 'To the moon! 🚀' },
    { id: 2, user: 'DiamondHands', content: 'HODL strong, fellow memers!' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const COIN_TICKER = 'MEMECOIN'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      new (window as any).TradingView.widget({
        width: '100%',
        height: 400,
        symbol: 'NASDAQ:NVDA',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#1e1e1e',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview_chart'
      })
    }
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', content: newMessage }])
      setNewMessage('')
    }
  }

  const handleSetAmount = (amount: string) => {
    setTradeAmount(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        <main className="pt-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500 mb-8">
            Trade
            </h1>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Real-time Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="tradingview_chart"></div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Market Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center bg-gray-700 p-3 rounded-lg">
                <DollarSign className="mr-2 h-6 w-6 text-green-400" />
                <span className="font-semibold text-gray-200">Market Cap:</span>
                <span className="ml-auto text-green-400">$4,206,969</span>
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-lg">
                <TrendingUp className="mr-2 h-6 w-6 text-blue-400" />
                <span className="font-semibold text-gray-200">24h Change:</span>
                <span className="ml-auto text-blue-400">+42.0%</span>
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-lg">
                <Users className="mr-2 h-6 w-6 text-yellow-400" />
                <span className="font-semibold text-gray-200">Holders:</span>
                <span className="ml-auto text-yellow-400">6,942</span>
              </div>
              <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button 
                    className={`w-full py-2 text-lg font-bold ${isBuyMode ? 'bg-green-500 text-gray-900' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setIsBuyMode(true)}
                  >
                    Buy
                  </Button>
                  <Button 
                    className={`w-full py-2 text-lg font-bold ${!isBuyMode ? 'bg-red-500 text-gray-900' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setIsBuyMode(false)}
                  >
                    Sell
                  </Button>
                </div>
                <div className="relative mb-4">
                  <Input 
                    type="text" 
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    className="w-full pr-16 bg-gray-800 border-gray-700 text-gray-100"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {isBuyMode ? 'XLM' : COIN_TICKER}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button variant="outline" size="sm" className="text-gray-400" onClick={() => handleSetAmount('0.0')}>reset</Button>
                  <Button variant="outline" size="sm" className="text-gray-400" onClick={() => handleSetAmount('0.1')}>0.1</Button>
                  <Button variant="outline" size="sm" className="text-gray-400" onClick={() => handleSetAmount('0.5')}>0.5</Button>
                  <Button variant="outline" size="sm" className="text-gray-400" onClick={() => handleSetAmount('1')}>1</Button>
                </div>
                <Button className="w-full py-3 text-lg font-bold bg-green-500 hover:bg-green-400 text-gray-900">
                  place trade
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Meme Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                <p className="font-semibold text-purple-400">{msg.user}</p>
                <p className="text-gray-300">{msg.content}</p>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Drop your memes here..." 
              className="flex-grow bg-gray-700 border-gray-600 text-gray-100"
            />
            <Button onClick={handleSendMessage} className="bg-purple-500 text-white hover:bg-purple-400">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      </main>
    </div>
  )
}

export default UpdatedDashboard