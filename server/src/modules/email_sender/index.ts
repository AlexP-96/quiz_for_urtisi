import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'lubu221996@yandex.ru',
        pass: process.env.PASSWORD_EAMIL,
    },
});

export async function sendLetter(email: string, body: { quiz: string, question: string, answer: string[] }) {
    const info = await transporter.sendMail({
        from: '<lubu221996@yandex.ru>',
        to: email,
        subject: 'Отправлено с сервиса по созданию AlexQuiz',
        text: 'Text',
        html: `
            ${body.quiz} - название квиза,
            ${body.question} - вопрос,
            ${body.answer.join(', ')} - ответы
        `,
    });

    console.log('Сообщение отправлено на почту : %s', info.messageId);
}
