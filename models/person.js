import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    //check if its new or old
    if (person.isModified('password')) {
        try {
            //Hash the password only if it is a new record or password is modified
            const salt = await bcrypt.genSalt(10);

            //Hash password
            const hashedPassword = await bcrypt.hash(person.password, salt);

            //Override the old password with the new Hashed password
            person.password = hashedPassword;
            next();

        } catch (err) {
            return next(err);
        }
    } else {
        return next();
    }


});


personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //use bcrypt to compare the provided password wih the hash password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}


const Person = mongoose.model('Person', personSchema);
export default Person;