import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Person from './models/person.js';



passport.use(new LocalStrategy(async (userName, password, done) => {
    try {
        // console.log(`Received Credential:\nUserName : ${userName}\nPassword : ${password}`);
        const user = await Person.findOne({ username: userName });
        if (!user) {
            console.log(`User with UserName : ${userName} not found`);
            return done(null, false, { message: 'Incorrect Udername' });
        } else {
            const isPasswordMatch = await user.comparePassword(password);
            if (isPasswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { error: "Incorrect Password" })
            }
        }
    } catch (err) {
        done(err);
    }
}));

export default passport;