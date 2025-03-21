# AI Survey Generator

A Next.js-based survey generator that uses AI-driven logic to generate relevant questions from a given title. Users can input a topic, receive dynamically generated questions, and interact with a clean, modern UI.

## 🚀 Features

- AI-driven Question Generation: Generates five questions based on the provided topic.
- Modern UI: Built with Next.js and styled using Tailwind CSS.
- Dynamic Survey Creation: Automatically categorizes the topic and provides tailored questions.
- Error Handling: Robust error validation for user input.
- Deployed on Vercel: [Live Demo](https://a-i-survey-generator-project.vercel.app/)

## 🛠️ Tech Stack

- Frontend: Next.js, Tailwind CSS
- Backend: Next.js API Routes (Node.js)
- Database: MongoDB (Planned with Prisma ORM integration)
- AI Integration: Local category-based question generator (OpenAI-compatible logic)

## 📋 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-survey-generator.git
cd ai-survey-generator
```

### 2. Install Dependencies

Ensure you have Node.js and npm installed.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```
I use the google-api to genrate the question locally but if u have the openAi api key for the plan u paid u can use that instead of the googlde api-key in .env.local
OPENAI_API_KEY=your-openai-key
DATABASE_URL=your-mongodb-url
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application in action.

## 📊 API Endpoints

### POST `/api/generate-questions`

Generates AI-driven questions based on the provided topic.

**Request Body:**

```json
{
  "title": "Customer Feedback"
}
```

**Response:**

```json
{
  "questions": [
    "What do you like most about customer feedback?",
    "What do you like least about customer feedback?",
    "How could customer feedback be improved?",
    "How likely are you to continue using customer feedback?",
    "What additional features would you like to see in customer feedback?"
  ],
  "source": "local-generator"
}
```

## ✅ Future Improvements

- Integrate OpenAI for question generation by paying the open-ai key 
