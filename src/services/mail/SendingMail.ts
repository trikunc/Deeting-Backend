import nodemailer from "nodemailer"

type MailOptions = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

class SendingMailService {

    private transport = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
            user: "postmaster@sandboxe9f1c5368c5a4cab93950dbf8b5600e9.mailgun.org",
            pass: "fbd64dee1d467579db62c0b775a4e7ed-c485922e-b740fb7d",
        }
    })

    /**
     * Sending Mail
     * @param  {MailOptions} options
     */
    async sendMail(options: MailOptions) {
        this.transport.sendMail(options, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info.response)
            }
        })
    }
}

export default new SendingMailService()