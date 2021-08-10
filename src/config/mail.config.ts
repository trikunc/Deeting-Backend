
export type MailConfig = {
    host: string;
    username: string
    password: string
}

export const mailConfig: MailConfig = {
    host: process.env.SMTP_HOST as string,
    username: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASS as string
}