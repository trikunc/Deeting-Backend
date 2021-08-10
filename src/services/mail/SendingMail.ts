import nodemailer, { Transporter } from "nodemailer"

type MailOptions = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

class SendingMailService {
    private transport: Transporter
    constructor(host: string, user: string, password: string) {
        this.transport = nodemailer.createTransport({
            host: host,
            port: 587,
            auth: {
                user: user,
                pass: password,
            }
        })
    }
    /**
     * Sending Mail
     * @param  {MailOptions} options
     */
    async sendMail(options: MailOptions) {
        this.transport.sendMail(options, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info)
            }
        })
    }
}

export default  SendingMailService