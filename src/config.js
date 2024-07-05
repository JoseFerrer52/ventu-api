import dotenv from "dotenv";

dotenv.config();

export const CONFIG ={
app: {
    secret: {
    jwt: process.env.JET_SECRET
},
database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,        
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}}
}