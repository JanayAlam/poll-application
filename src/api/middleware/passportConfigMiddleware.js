const passport = require('passport');
const passportJWT = require('passport-jwt');
const models = require('../models/data-models');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const secretKey = process.env.JWT_SECRET;

// the passport jwt strategy options.
let JWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}
// configuring the passport js
passport.use(new JwtStrategy(JWTOptions, function (JWTPayload, done) {
    // finding the user from the database
    models.User.findOne({ id: JWTPayload.id }, function (err, user) {
        if (err || !user) {
            // invalid token
            return done(err, false);
        }
        // valid token
        return done(null, user);
    });
}));
