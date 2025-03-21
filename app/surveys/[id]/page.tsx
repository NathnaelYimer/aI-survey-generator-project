import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { Survey } from "@/lib/types"

interface SurveyDetailPageProps {
  params: {
    id: string
  }
}

export default async function SurveyDetailPage({ params }: SurveyDetailPageProps) {
  const survey = (await prisma.survey.findUnique({
    where: {
      id: params.id,
    },
    include: {
      responses: true,
    },
  })) as Survey | null

  if (!survey) {
    notFound()
  }

  return (
    <main className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{survey.title}</h1>
        <div className="flex gap-2">
          <Link href="/surveys">
            <Button variant="outline">Back to Surveys</Button>
          </Link>
          <Link href="/">
            <Button>Create New Survey</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Survey Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            {survey.questions.map((question, index) => (
              <li key={index} className="font-medium">
                {question}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Responses ({survey.responses?.length || 0})</h2>

      {!survey.responses || survey.responses.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">No responses yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {survey.responses.map((response) => (
            <Card key={response.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  Submitted {format(response.createdAt, "PPP 'at' p")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {survey.questions.map((question, qIndex) => (
                    <div key={qIndex}>
                      <h4 className="font-medium">
                        {qIndex + 1}. {question}
                      </h4>
                      <p className="mt-1 p-3 bg-muted rounded-md">{response.answers[qIndex]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

