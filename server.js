import express from 'express';
import db, { mongoURL } from './db.js';
import personRouter from './routes/personRoutes.js';
import menuRouter from './routes/menuRoutes.js';
import bodyParser from 'body-parser';//for extracting data from postman
import passport from './auth.js';//for authentication and authorization


import dotenv from 'dotenv';//to wrap critical variables into .env file
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());


// MiddleWare Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //Move on to the next phase
}; app.use(logRequest);



//varible to add authentication to any router or app call.
app.use(passport.initialize());
const localAuthMiddleWre = passport.authenticate('local', { session: false });


//if we want to add authentication to these..then we can write:
// app.use('/Person',localAuthMiddleWre, personRouter);
// app.use('/Menu', localAuthMiddleWre,menuRouter);


app.use('/Person', personRouter);
app.use('/Menu', menuRouter);

console.log("MongoDB connection URL: ", mongoURL);
// console.log("MongoDB Atlas connection URL: ", mongoAtlasURL);
app.get('/', (req, res) => {
    res.send('Welcome to my hotel')
});

app.listen(PORT, () => {
    console.log("server in listening on port 3000");
});