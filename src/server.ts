import * as dotenv from "dotenv";
import express,{ Application } from "express";
import cors from "cors";
import mongoDBConnection from "./config/mongoconnection";
import userRouter from "./routes/users.route";
import hobbiesRouter from "./routes/hobbies.route";
import {Request,Response} from "express";
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
const swaggerData: any = fs.readFileSync('src/config/swagger.json', 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const app:Application = express();
mongoDBConnection();

app.use(cors());
app.use(express.json());

app.use('/users',userRouter)
app.use('/hobbies',hobbiesRouter)

app.get('/', (req:Request,res:Response) => {
    res.status(200).send("Welcome!");
})

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

export const server = app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`)
})