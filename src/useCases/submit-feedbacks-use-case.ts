import { IMailAdapter } from '../adapters/mail-adapter'
import { IFeedbackRepository } from '../repositories/feedbacks-repository'

interface IRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbackRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute({ comment, type, screenshot }: IRequest) {
    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      comment,
      type,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div class="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && `<img src="${screenshot}">`,
        `</div>`,
      ].join('\n'),
    })
  }
}
