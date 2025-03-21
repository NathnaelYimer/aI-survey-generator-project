"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"

export function SurveyGenerator() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""))
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const generateQuestions = async () => {
    if (!title.trim()) {
      toast.error("Please enter a survey title to generate questions.")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate questions")
      }

      const data = await response.json()
      setQuestions(data.questions)
      setAnswers(Array(data.questions.length).fill(""))
      setSubmitted(false)
    } catch (error) {
      console.error("Error generating questions:", error) // ✅ Log the error
      toast.error("Failed to generate questions. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const submitSurvey = async () => {
    if (questions.length === 0) {
      toast.error("Please generate questions first.")
      return
    }

    if (answers.some((answer) => !answer.trim())) {
      toast.error("Please answer all questions before submitting.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          questions,
          answers,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit survey")
      }

      setSubmitted(true)
      toast.success("Your survey responses have been submitted.")
    } catch (error) {
      console.error("Error submitting survey:", error) // ✅ Log the error
      toast.error("Failed to submit survey. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setQuestions([])
    setAnswers([])
    setSubmitted(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create a New Survey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Survey Title
              </label>
              <div className="flex space-x-2">
                <Input
                  id="title"
                  placeholder="Enter a survey title..."
                  value={title}
                  onChange={handleTitleChange}
                  disabled={isGenerating || submitted}
                />
                <Button onClick={generateQuestions} disabled={isGenerating || !title.trim() || submitted}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Questions"
                  )}
                </Button>
              </div>
            </div>

            {questions.length > 0 && !submitted && (
              <div className="space-y-6 mt-6">
                <h3 className="text-lg font-medium">Survey Questions</h3>
                {questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium">
                      {index + 1}. {question}
                    </label>
                    <Textarea
                      placeholder="Your answer..."
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      disabled={isSubmitting}
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            )}

            {submitted && (
              <div className="bg-primary/10 p-6 rounded-lg mt-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-4">Your survey responses have been successfully submitted.</p>
                <Button onClick={resetForm}>Create Another Survey</Button>
              </div>
            )}
          </div>
        </CardContent>
        {questions.length > 0 && !submitted && (
          <CardFooter className="flex justify-end">
            <Button onClick={submitSurvey} disabled={isSubmitting || questions.length === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Survey"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
