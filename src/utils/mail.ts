import { mailConfig } from "../config/mail.config"
import SendingMailService from "../services/mail/SendingMail"

export const mail = async (to: string, subject: string, html: string) => {
    await new SendingMailService(
        mailConfig.host,
        mailConfig.username,
        mailConfig.password
    ).sendMail({
        from: "noreply@deeting.ai",
        to: to,
        subject: subject,
        html: html,
        text: subject
    })
}