import { SurveyGenerator } from "@/components/survey-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">AI Survey Generator</h1>
        <p className="text-muted-foreground text-center mb-10">
          Enter a title and our AI will generate relevant survey questions for you.
        </p>
        <SurveyGenerator />
      </div>
    </main>
  )
}

