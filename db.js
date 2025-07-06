import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// const mongoURL = 'mongodb://localhost:27018/hotel';
// const mongoURL = process.env.MONGODB_URL_LOCAL;
// mongoose.connect(mongoURL)
// const mongoURL = 'mongodb+srv://abhishekninawe2303:Abhi9573@cluster0.unpf9un.mongodb.net/';
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB Server");
})
db.on('error', () => {
    console.log("MongoDB Server Connection error");
})
db.on('Disconnected', () => {
    console.log("Disconnected to MongoDB Server");
})

export default db;
export { mongoURL }