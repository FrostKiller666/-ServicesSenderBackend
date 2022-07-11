import {Router} from "express";
import {compare, hash} from 'bcrypt';

import {ValidationError} from "../utils/errrors";
import {UserRecord} from "../records/user.record";

export const userRouter = Router()

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
    });

