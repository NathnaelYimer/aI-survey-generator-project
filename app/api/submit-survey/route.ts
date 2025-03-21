import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { title, questions, answers } = await request.json()

    if (!title || !questions || !answers) {
      return NextResponse.json({ error: "Title, questions, and answers are required" }, { status: 400 })
    }

    if (questions.length !== answers.length) {
      return NextResponse.json({ error: "Number of questions and answers must match" }, { status: 400 })
    }

    // Create a new survey and its response in the database
    const survey = await prisma.survey.create({
      data: {
        title,
        questions,
        responses: {
          create: {
            answers,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      surveyId: survey.id,
    })
  } catch (error) {
    console.error("Error submitting survey:", error)
    return NextResponse.json({ error: "Failed to submit survey" }, { status: 500 })
  }
}