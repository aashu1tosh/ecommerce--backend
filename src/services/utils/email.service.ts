import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { DotenvConfig } from '../../config/env.config';
import HttpException from '../../utils/HttpException.utils';

export interface IMailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export class EmailService {
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    private readonly from: string;

    constructor() {
        this.from = DotenvConfig.EMAIL_USER!;
        this.transporter = nodemailer.createTransport({
            host: DotenvConfig.MAIL_HOST,
            port: DotenvConfig.MAIL_PORT,
            secure: false,
            // requireTLS: true,
            auth: {
                user: DotenvConfig.EMAIL_USER,
                pass: DotenvConfig.EMAIL_PASSWORD,
            },
        });
    }

    async sendMail({ to, html, subject, text }: IMailOptions) {
        try {
            const mailOptions = {
                from: this.from,
                text,
                to,
                html,
                subject,
            };
            const res = await this.transporter.sendMail(mailOptions);
            return res;
        } catch (error) {
            throw HttpException.internalServerError('Error from email service');
        }
    }
}

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//         user: DotenvConfig.EMAIL_USER,
//         pass: DotenvConfig.EMAIL_PASSWORD,
//     },
// });

// const mailOptions = {
//     from: {
//         name: 'E-commerce Site',
//         address: DotenvConfig.EMAIL_USER
//     }, // sender address
//     to: "aashutosh282@gmail.com", // list of receivers
//     subject: "Sending Mail using nodemailer and gmail", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// }

// const sendMail = async (transporter: any, mailOptions: any) => {
//     try {
//         await transporter.sendMail(mailOptions)
//         console.log("Email sent successfully")
//     } catch (error) {
//         console.log(error);
//     }
// }

// sendMail(transporter, mailOptions)
