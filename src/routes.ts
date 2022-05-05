import { Router } from 'express'

import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from './useCases/submit-feedbacks-use-case'

export const routes = Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, screenshot, comment } = req.body

  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  submitFeedbackUseCase.execute({
    comment,
    type,
    screenshot,
  })

  return res.status(201).send()
})
