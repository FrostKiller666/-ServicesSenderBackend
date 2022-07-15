import {Router} from "express";
import nodemailer from "nodemailer";

import {ValidationError} from "../utils/errrors";
import {configOAuth2} from "../config/config";
import {OrderRecord} from "../records/order.record";
import { newBodyTableHtml} from "../utils/html/order/bodyTableHtml";
import {OrderDataReq, OrderEntity} from "../types/order";
import {headTableHtml} from "../utils/html/order/headTableHtml";
import {informationTableHtml} from "../utils/html/order/informationTableHtml";


const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(configOAuth2.clientId, configOAuth2.clientSecret);
OAuth2_client.setCredentials({
    refresh_token: configOAuth2.refreshToken,
});


export const orderRouter = Router()

    .post('/new-order', async (req, res) => {
            //@TODO Try catch block if you want to display onlyone message without all of order record message.

         await Object.values(req.body).forEach((value: OrderEntity) => {
             new OrderRecord(value ).insert();
        })
            res.status(200).json({
                message: 'Dane zostały, przygotowane do wysłania. Wiadomość zachwilę powinna dotrzeć do odbiorcy.',
            })

    })
    .post('/new-order/send-email', async (req, res) => {
        const orderData: any = req.body;
        let showInformation: string[] = [];


        Object.values(req.body).map((value: OrderEntity, index) => {
            if (value.information) {
                showInformation.push(value.information);
            }
        })

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
            subject: `${orderData[0].pointName}`, // Subject line
            html: `
                    <h2>Zamówienie: </h2>
                    <table style="border-width: 2px; border-color: black; border-style: dashed; width: 100%">
                        <thead align="left">
                           ${headTableHtml()}
                        </thead>
                        <tbody>
                        ${
                            newBodyTableHtml(Object.values(req.body))
                        }
                        </tbody>
                    </table>
                    ${
                        informationTableHtml(showInformation, showInformation.length === 0 ? false : true)}
                    `});

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
    })
    .patch('/order-list', async (req, res) => {
        try {
            const data = req.body;
            await OrderRecord.patchUsername(data.id, data.arrived);

            res.status(200).json({
                message: 'success'
            });
        } catch (err) {
            throw new ValidationError('Ptoblem z bazą danych, spróbuj za kilka chwil.')
        }
    });
