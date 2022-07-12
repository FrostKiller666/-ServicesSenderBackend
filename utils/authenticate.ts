import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {ValidationError} from "./errrors";

interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.JWT;
        if (!token) throw new ValidationError('Nie masz dostępu do danego zasobu spróbuj jeszcze raz.');

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        (req as CustomRequest).token = decoded;

        next();

    } catch (err) {
        throw new ValidationError('Brak autentykacji');
    }

}
