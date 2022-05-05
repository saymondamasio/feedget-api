import { prisma } from '../../prisma'
import {
  IFeedbackCreateData,
  IFeedbackRepository,
} from '../feedbacks-repository'

export class PrismaFeedbacksRepository implements IFeedbackRepository {
  async create({ comment, type, screenshot }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })
  }
}
