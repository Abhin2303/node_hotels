import mongoose from 'mongoose';

const mongoURL = 'mongodb://localhost:27018/hotel';
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