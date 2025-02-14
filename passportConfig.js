const LocalStrategy = require('passport-local').Strategy 
const passport = require('passport')
const user = require('./schema')

exports.initializePassport = passport.use(new LocalStrategy(async(username, password, done)=>{
    try {
        // Find user by username
        const userExists = await user.findOne({ username: username });
        
        // If user not found
        if (!userExists) {
            return done(null, false, { message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await userExists.comparePassword(password);
        
        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // If credentials are correct, return the user object
        return done(null, userExists);
        
    } catch (error) {
        return done(error);
    }
}))

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const foundUser = await user.findById(id);
        done(null, foundUser);
    } catch (error) {
        done(error);
    }
});