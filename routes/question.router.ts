import {Router} from "express";
import nodemailer from "nodemailer";

import {ValidationError} from "../utils/errrors";
import {configOAuth2} from "../config/config";
import {bodyTableHtml} from "../utils/html/question/bodyTableHtml";
import {headTableHtml} from "../utils/html/question/headTableHtml";
import {informationTableHtml} from "../utils/html/question/informationTableHtml";
import {QuestionDataReq} from "../types";
import {QuestionRecord} from "../records/question.record";
import {OrderRecord} from "../records/order.record";


const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(configOAuth2.clientId, configOAuth2.clientSecret);
OAuth2_client.setCredentials({
    refresh_token: configOAuth2.refreshToken,
});


export const questionRouter = Router()

    .post('/new-question', async (req, res) => {
        //@TODO Try catch block if you want to display onlyone message without all of order record message.
        await new QuestionRecord(req.body).insert();

        res.status(200).json({
            message: 'Dane zostały, przygotowane do wysłania. Wiadomość zachwilę powinna dotrzeć do odbiorcy.',
        })
    })
    .post('/new-question/send-email', async (req, res) => {
        const orderData: QuestionDataReq = req.body;
        const showInformation = orderData.information !== '';
        orderData.color === '' ? orderData.color = 'BRAK' : orderData.color;

        const accessToken = OAuth2_client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: configOAuth2.emailId,
                clientId: configOAuth2.clientId,
                clientSecret: configOAuth2.clientSecret,
                refreshToken: configOAuth2.refreshToken,
                accessToken,
            }
        });

        await transport.sendMail({
            from: `"Bartosz Suski 👻"<${configOAuth2.emailId}>`, // sender address
            to: "bialywilk500@gmail.com", // list of receivers
            subject: `${orderData.pointName} - Dostępność Częśći`, // Subject line
            html: `
                    <h2>Zapytanie o dostępność częśći: </h2>
                    <table style="border-width: 2px; border-color: black; border-style: dashed; width: 65%">                        
                        <thead align="left">
                           ${headTableHtml()}
                        </thead>
                        <tbody>
                            ${bodyTableHtml(orderData.model, orderData.part, orderData.quality, orderData.color)}
                        </tbody>
                    </table>                                     
                    ${informationTableHtml(orderData.information, showInformation)}
                    
                    `,});

        res.status(200).json({
            message: 'Email został wysłany.',
        })
    })
    .post('/question-list', async (req, res) => {
        try {
            const data = req.body;
            const listOrders = await QuestionRecord.getAllUserOrder(data.userId);

            res.status(200).json(listOrders);
        } catch (err) {
            throw new ValidationError('Ptoblem z bazą danych, spróbuj za kilka chwil.')
        }

    }).patch('/question-list', async (req, res) => {
        try {
            const data = req.body;
            await OrderRecord.patchUsername(data.id, data.arrived);

            res.status(200).json({
                message: 'success'
            });
        } catch (err) {
            throw new ValidationError('Ptoblem z bazą danych, spróbuj za kilka chwil.')
        }
    });;

