import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import type { Survey } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function SurveysPage() {
  const surveys = (await prisma.survey.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
  })) as Survey[]

  return (
    <main className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Surveys</h1>
        <Link href="/">
          <Button>Create New Survey</Button>
        </Link>
      </div>

      {surveys.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No surveys yet</h3>
          <p className="text-muted-foreground mb-6">Create your first survey to get started</p>
          <Link href="/">
            <Button>Create Survey</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {surveys.map((survey) => (
            <Card key={survey.id}>
              <CardHeader className="pb-2">
                <CardTitle>{survey.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <p>{survey.questions.length} questions</p>
                    <p>{survey._count?.responses || 0} responses</p>
                    <p>Created {formatDistanceToNow(survey.createdAt, { addSuffix: true })}</p>
                  </div>
                  <Link href={`/surveys/${survey.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

