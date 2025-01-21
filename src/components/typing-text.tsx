'use client'

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Typing practice is essential for improving your speed and accuracy. With consistent practice, you can become a better typist.`

const TEST_DURATION = 60 // 60 seconds

interface TestResults {
  totalWords: number
  correctWords: number
  incorrectWords: number
  accuracy: number
  wpm: number
}

export function TypingTest() {
  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION)
  const [isTestActive, setIsTestActive] = useState(false)
  const [testComplete, setTestComplete] = useState(false)
  const [results, setResults] = useState<TestResults | null>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  const startTest = () => {
    setUserInput("")
    setTimeLeft(TEST_DURATION)
    setIsTestActive(true)
    setTestComplete(false)
    setResults(null)
  }

  const calculateResults = () => {
    const userWords = userInput.trim().split(" ")
    const sampleWords = SAMPLE_TEXT.trim().split(" ")
    const totalWords = userWords.length
    let correctWords = 0

    userWords.forEach((word, index) => {
      if (index < sampleWords.length && word === sampleWords[index]) {
        correctWords++
      }
    })

    const incorrectWords = totalWords - correctWords
    const accuracy = (correctWords / totalWords) * 100
    const wpm = Math.round((correctWords / TEST_DURATION) * 60)

    setResults({
      totalWords,
      correctWords,
      incorrectWords,
      accuracy: Math.round(accuracy),
      wpm,
    })
  }

  useEffect(() => {
    if (isTestActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTestActive])

  useEffect(() => {
    if (timeLeft === 0 && isTestActive) {
      setIsTestActive(false)
      setTestComplete(true)
      calculateResults()
    }
  }, [timeLeft, isTestActive])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <p className="text-lg leading-relaxed">{SAMPLE_TEXT}</p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button onClick={startTest} disabled={isTestActive}>
          {testComplete ? "Retry Test" : "Start Test"}
        </Button>
        <div className="text-2xl font-bold">
          {timeLeft}s
        </div>
      </div>

      <Textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={isTestActive ? "Start typing..." : "Click 'Start Test' to begin"}
        disabled={!isTestActive}
        className="min-h-[200px]"
      />

      {testComplete && results && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Words Per Minute</p>
                <p className="text-2xl font-bold">{results.wpm} WPM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">{results.accuracy}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Correct Words</p>
                <p className="text-2xl font-bold text-green-500">{results.correctWords}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Incorrect Words</p>
                <p className="text-2xl font-bold text-red-500">{results.incorrectWords}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Words</p>
                <p className="text-2xl font-bold">{results.totalWords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

