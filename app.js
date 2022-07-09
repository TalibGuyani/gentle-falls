/* IMPORT DEPENDENCIES */
import dotenv from 'dotenv'
import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import mongoose from "mongoose";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';

/* INITIALISE APP */
dotenv.config();
const app = express();

/* LOAD MIDDLEWEAR */
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(':status :method :url'));

/* MOUNT ROUTES */

app.use('/api/v1/users', userRouter);

/* CONNNECT TO DATABASE */
mongoose.connect(process.env.MONGODB_URI);

/* SET STATIC PATH FOR PRODUCTION */

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, 'client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });

    app.use((req, res, next) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    })
}

/* CONNNECT TO SERVER */
const PORT = process.env.PORT || 1337; 

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});