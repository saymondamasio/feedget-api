export interface ISendMailAdapter {
  subject: string
  body: string
}

export interface IMailAdapter {
  sendMail(data: ISendMailAdapter): Promise<void>
}
