import {Router} from "express";
import jwt from 'jsonwebtoken';
import {compare, hash} from 'bcrypt';

import {CustomRequest} from "../types/jwt/jwt-customr-request";
import {ValidationError} from "../utils/errrors";
import {UserRecord} from "../records/user.record";
import {authenticate} from "../utils/authenticate";
import {ResponseUserPassword, ResponseUserUsername} from "../types";
export const userRouter = Router()

    .get('/auth', authenticate, async (req, res) => {
        const token = req.cookies.JWT;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        (req as CustomRequest).token = decoded;

        // @ts-ignore
        const userData = await UserRecord.getOneUser(decoded.username);

        res.json(userData);
    })
    .get('/clear-cookie',  async (req, res) => {
        try{
            res.clearCookie('JWT');
            res.json('Cookie removed');
        }catch (err) {
            throw new ValidationError('Problem with logout, sorry try later.')
        }

    })
    .post('/register', async (req, res) => {
        const user = new UserRecord(req.body);

        hash(user.password, 10, async (err, hash) => {
            if (err) {
                throw new ValidationError('Coś poszło nie tak, spróbuj jeszcze raz.');
            } else {
                if (user.password.length > 36 || user.password.length < 8) {
                    throw new ValidationError('Hasło musi być w przedziale od 8 do 36');
                }
                user.password = hash;
                await user.insert();
                res.json(user);
            }
        });
    })
    .post('/login', async (req, res) => {
        const user = req.body;
        const {email, password} = user.data;

        if ((email || password) === undefined) {
            throw new ValidationError('Coś poszło nie tak, spróbuj potem. ');
        }

        const userData = await UserRecord.getOne(email);
        if (!userData) {
            throw new ValidationError('Taki adres mailowy nie istnieje.');
        }

        if (await compare(password, userData.password)) {
            const accessToken = jwt.sign({username: userData.username}, process.env.TOKEN_SECRET, {expiresIn: '30 days'});
            res.cookie("JWT", accessToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.json({
                userId: userData.id,
            });

        } else {
            throw new ValidationError('Hasła są nieprawidłowe, spróbuj jeszcze raz.');
        }

    })

    .patch('/change-password',  async (req, res) => {
        const userData: ResponseUserPassword = req.body;

        if(!userData) {
            throw new ValidationError('Coś poszło nie tak przy rejestrowaniu konta, spróbuj zakilka chwil.')
        }

        if (await compare(userData.oldPassword, userData.resPassword)) {
            hash(userData.password, 10, async (err, hash) => {
                try {
                    if(userData.password.length > 36 || userData.password.length <8) {
                        throw new ValidationError('Hasło musi być w przedziale od 8 do 36');
                    }
                    await UserRecord.patchPassword(hash, userData.resUsername);
                    res.status(200).json({
                        message: 'Hasło zostało pomyślnie zmienione, dziękujemy.',
                    });

                } catch (err) {
                    throw new ValidationError('Coś poszło nie przy próbie hashowania, prosimy o cierpliwość.');
                }
            })
        } else {
            throw new ValidationError('Twoje stare hasło było inne, spróbuj jeszcze raz.');
        }

    })
    .patch('/change-username',  async (req, res) => {
        const userData: ResponseUserUsername = req.body;

        if(!userData) {
            throw new ValidationError('Coś poszło nie tak przy zmianie nicku, spróbuj za kilka chwil.')
        }

        try {
            await UserRecord.patchUsername(userData.resId, userData.username);
            const accessToken = jwt.sign({username: userData.username}, process.env.TOKEN_SECRET, {expiresIn: 30 * 24 * 60 * 60 * 1000});
            res.cookie("JWT", accessToken, { httpOnly: true, secure: true, sameSite: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

            res.status(200).json({
                message: 'Nick został pomyślnie zmieniony.',
            });
        } catch (err) {
            throw new ValidationError('Ten nick jest zajęty.')
        }

    });




