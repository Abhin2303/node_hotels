import express from 'express';
import db, { mongoURL } from './db.js';
import personRouter from './routes/personRoutes.js';
import menuRouter from './routes/menuRoutes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my hotel')
})


app.use('/Person', personRouter);
app.use('/Menu', menuRouter);


console.log("MongoDB connection URL: ", mongoURL);
// console.log("MongoDB Atlas connection URL: ", mongoAtlasURL);

app.listen(PORT, () => {
    console.log("server in listening on port 3000");
})