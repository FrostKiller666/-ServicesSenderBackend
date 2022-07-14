import {Router} from "express";
import nodemailer from "nodemailer";

import {ValidationError} from "../utils/errrors";
import {configOAuth2} from "../config/config";
import {OrderRecord} from "../records/order.record";
import {bodyTableHtml} from "../utils/bodyTableHtml";
import {OrderDataReq} from "../types/order";
import {headTableHtml} from "../utils/headTableHtml";
import {informationTableHtml} from "../utils/informationTableHtml";


const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(configOAuth2.clientId, configOAuth2.clientSecret);
OAuth2_client.setCredentials({
    refresh_token: configOAuth2.refreshToken,
});


export const orderRouter = Router()

    .post('/new-order', async (req, res) => {
        try {
            await new OrderRecord(req.body).insert();

            res.status(200).json({
                message: 'Dane zostały, przygotowane do wysłania. Wiadomość zachwilę powinna dotrzeć do odbiorcy.',
            })
        } catch (err) {
            throw new ValidationError('Problem z dodaniem zamówienia, spróbuj za kilka chwil.');
        }

    })
    .post('/new-order/send-email', async (req, res) => {
        const orderData: OrderDataReq = req.body;
        orderData.color === '' ? orderData.color = 'BRAK' : orderData.color;
        const showInformation = orderData.information !== '';

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
            subject: `${orderData.pointName}`, // Subject line
            html: `
                    <table style="border-width: 2px; border-color: black; border-style: dashed; width: 100%">
                        <thead align="left">
                           ${headTableHtml()}
                        </thead>
                        <tbody>
                            ${bodyTableHtml(orderData.model, orderData.part, orderData.quality, orderData.price, orderData.guarantee, orderData.color)}
                        </tbody>
                    </table>                                     
                    ${informationTableHtml(orderData.information, showInformation)}
                    
                    `,});

        res.status(200).json({
            message: 'Email został wysłany.',
        })
    })
    .post('/order-list', async (req, res) => {
        try {
            const data = req.body;
            const listOrders = await OrderRecord.getAllUserOrder(data.userId);

            res.status(200).json(listOrders);
        } catch (err) {
            throw new ValidationError('Ptoblem z bazą danych, spróbuj za kilka chwil.')
        }

    });

