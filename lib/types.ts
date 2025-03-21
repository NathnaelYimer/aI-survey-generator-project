export interface Survey {
  id: string
  title: string
  questions: string[]
  responses: SurveyResponse[]
}

export interface SurveyResponse {
  id: string
  answers: string[]
  createdAt: Date
}

