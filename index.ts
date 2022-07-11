import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import rateLimit from 'express-rate-limit';
import 'express-async-errors';

import './utils/db';
import {config} from "./config/config";
import {handleError} from "./utils/errrors";
import {userRouter} from "./routes/user.router";


dotenv.config();
const app = express();

app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));
app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1115 minutes)
}));

app.use('/user', userRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
