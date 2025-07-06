import express from 'express';
import db, { mongoURL } from './db.js';
import personRouter from './routes/personRoutes.js';
import menuRouter from './routes/menuRoutes.js';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my hotel')
})


app.use('/Person', personRouter);
app.use('/Menu', menuRouter);


console.log("MongoDB connection URL: ", mongoURL);
app.listen(3000, () => {
    console.log("server in listening on port 3000");
})