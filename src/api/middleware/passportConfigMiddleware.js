// Dependencies.
import passport from 'passport';
import passportJWT from 'passport-jwt';
import models from '../models/data-models';
// Some variables.
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
// The secret key.
const secretKey = process.env.JWT_SECRET;

// The passport jwt strategy options. 
let JWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}
// Configuring the passport js.
passport.use(new JwtStrategy(JWTOptions, function (JWTPayload, done) {
    // Finding the user from the database.
    models.User.findOne({ id: JWTPayload.id }, function (err, user) {
        if (err || !user) {
            // Invalid token.
            return done(err, false);
        }
        // Valid token.
        return done(null, user);
    });
}));
