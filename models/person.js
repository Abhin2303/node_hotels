import mongoose from 'mongoose';
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
    },
    work: {
        type: String,
        required: true,
        enum: ['chef', 'waiter', 'manager']
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false,
    },
    salary: {
        type: Number,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
export default Person;