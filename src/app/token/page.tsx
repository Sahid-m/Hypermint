'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Loader2, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const memeWords = ['Doge', 'Moon', 'Rocket', 'Diamond', 'Hands', 'Ape', 'HODL', 'Lambo', 'Tendies', 'Stonks']

interface FormData {
  name: string;
  ticker: string;
  description: string;
  image: string | null;
  twitter: string;
  telegram: string;
  website: string;
}

interface Errors {
  name?: string;
  ticker?: string;
  description?: string;
  image?: string;
}

const MemeTokenCreatorComponent: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    ticker: '',
    description: '',
    image: null,
    twitter: '',
    telegram: '',
    website: ''
  })
  const [errors, setErrors] = useState<Errors>({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }))
      setErrors(prev => ({ ...prev, image: '' }))
    }
  }

  const generateRandomName = () => {
    const adjective = memeWords[Math.floor(Math.random() * memeWords.length)]
    const noun = memeWords[Math.floor(Math.random() * memeWords.length)]
    setFormData(prev => ({ ...prev, name: `${adjective} ${noun}` }))
  }

  const generateRandomTicker = () => {
    const ticker = formData.name.split(' ').map(word => word[0]).join('').toUpperCase()
    setFormData(prev => ({ ...prev, ticker }))
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Errors = {}
    let isValid = true

    if (currentStep === 1) {
      if (!formData.name) {
        newErrors.name = 'Name is required'
        isValid = false
      }
      if (!formData.ticker) {
        newErrors.ticker = 'Ticker is required'
        isValid = false
      }
    } else if (currentStep === 2) {
      if (!formData.description) {
        newErrors.description = 'Description is required'
        isValid = false
      }
      if (!formData.image) {
        newErrors.image = 'Image is required'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prevStep => prevStep + 1)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateStep(3)) {
      console.log('Form submitted:', formData)
      // Here you would typically send the data to your backend
      alert('Meme token created successfully!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">
          Create Your Meme Token
        </h1>
        <div className="mb-8 flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1/3 h-2 rounded-full ${
                i <= step ? 'bg-gradient-to-r from-violet-400 to-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Token Name
                  </label>
                  <div className="flex">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="flex-grow text-gray-700"
                      placeholder="e.g. Moon Rocket" 
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="ml-2 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
                            onClick={generateRandomName}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate random name</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="ticker" className="block text-sm font-medium text-gray-700 mb-1">
                    Ticker
                  </label>
                  <div className="flex">
                    <Input
                      id="ticker"
                      name="ticker"
                      value={formData.ticker}
                      onChange={handleInputChange}
                      className="flex-grow text-gray-700"
                      placeholder="e.g. MR"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="ml-2 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
                            onClick={generateRandomTicker}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate ticker from name</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.ticker && <p className="text-red-500 text-sm mt-1">{errors.ticker}</p>}
                </div>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    className='text-gray-700'
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your meme token..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Token Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="flex-grow text-gray-700"
                    />
                    {formData.image && (
                      <img src={formData.image} alt="Token preview" className="w-16 h-16 object-cover rounded" />
                    )}
                  </div>
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <div>
                  <h1 className='mx-auto w-1/2 text-center text-gray-700'>Your token is being created!!</h1>
                  <p className='mx-auto w-1/2 text-center text-gray-700'>Have a stellar experience</p>
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" onClick={() => setStep(prevStep => prevStep - 1)}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={handleNextStep} className="ml-auto">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Create Token <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default MemeTokenCreatorComponent