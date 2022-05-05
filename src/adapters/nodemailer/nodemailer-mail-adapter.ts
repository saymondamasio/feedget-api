import nodemailer from 'nodemailer'

import { IMailAdapter, ISendMailAdapter } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5dba6cc4906980',
    pass: '18de4ab1104536',
  },
})

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ body, subject }: ISendMailAdapter): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Saymon Damásio <saymon.damasio95@gmail.com>',
      subject,
      html: body,
    })
  }
}
