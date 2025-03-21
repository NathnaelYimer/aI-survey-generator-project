import { NextResponse } from "next/server"

// Define a type for the categories
type QuestionCategory = "default" | "education" | "product" | "service" | "feedback"

// Category-based question templates
const questionTemplates: Record<QuestionCategory, string[]> = {
  default: [
    "What are your thoughts on {topic}?",
    "How would you rate your experience with {topic}?",
    "What improvements would you suggest for {topic}?",
    "What aspects of {topic} do you find most interesting?",
    "Would you recommend {topic} to others? Why or why not?",
  ],
  education: [
    "How effective was the {topic} learning material?",
    "What teaching methods in {topic} do you find most helpful?",
    "How would you rate the instructor's knowledge of {topic}?",
    "What aspects of {topic} would you like to learn more about?",
    "How has learning about {topic} impacted your skills?",
  ],
  product: [
    "How satisfied are you with the {topic} quality?",
    "What features of {topic} do you use most frequently?",
    "What improvements would make {topic} better?",
    "How likely are you to recommend {topic} to friends or colleagues?",
    "What was your main reason for choosing {topic}?",
  ],
  service: [
    "How would you rate the {topic} customer service?",
    "Was the {topic} service delivered in a timely manner?",
    "Did the {topic} service meet your expectations?",
    "What could we do to improve your {topic} experience?",
    "Would you use {topic} service again in the future?",
  ],
  feedback: [
    "What do you like most about {topic}?",
    "What do you like least about {topic}?",
    "How could {topic} be improved to better meet your needs?",
    "How likely are you to continue using {topic}?",
    "What additional features would you like to see in {topic}?",
  ],
}

// Function to determine the best category based on the title
function getCategory(title: string): QuestionCategory {
  const titleLower = title.toLowerCase()

  if (
    titleLower.includes("education") ||
    titleLower.includes("learning") ||
    titleLower.includes("course") ||
    titleLower.includes("training") ||
    titleLower.includes("school") ||
    titleLower.includes("class")
  ) {
    return "education"
  } else if (
    titleLower.includes("product") ||
    titleLower.includes("item") ||
    titleLower.includes("purchase") ||
    titleLower.includes("buy") ||
    titleLower.includes("goods")
  ) {
    return "product"
  } else if (
    titleLower.includes("service") ||
    titleLower.includes("support") ||
    titleLower.includes("assistance") ||
    titleLower.includes("help") ||
    titleLower.includes("consultation")
  ) {
    return "service"
  } else if (
    titleLower.includes("feedback") ||
    titleLower.includes("opinion") ||
    titleLower.includes("review") ||
    titleLower.includes("thoughts") ||
    titleLower.includes("suggestion")
  ) {
    return "feedback"
  }

  return "default"
}

// Function to generate questions based on title
function generateQuestionsFromTitle(title: string): string[] {
  const category = getCategory(title)
  const templates = questionTemplates[category]

  // Extract key terms from the title
  const keyTerms = title
    .split(" ")
    .filter((word) => word.length > 3)
    .map((word) => word.toLowerCase())

  // Use the full title if no good key terms
  const topic = keyTerms.length > 0 ? keyTerms.join(" ") : title.toLowerCase()

  // Replace {topic} in templates with the actual topic
  return templates.map((template: string) => template.replace("{topic}", topic))
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json()

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required and must be a string" }, { status: 400 })
    }

    // Generate questions based on the title
    const questions = generateQuestionsFromTitle(title)

    // Return the generated questions
    return NextResponse.json({
      questions,
      source: "local-generator",
    })
  } catch (error) {
    console.error("Error in generate-questions route:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}

