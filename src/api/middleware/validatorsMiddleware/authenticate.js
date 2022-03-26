// Dependencies.
import express from 'express';
import passport from 'passport';
import { UnauthorizationError } from '../../errors/apiErrors';


/**
 * Authenticate the user.
 * @param {express.Request} req The request object provided by express.
 * @param {express.Response} res The request object provided by express.
 * @param {Function} next The request object provided by express.
 */
export default (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) return next(err);
        if (!user) throw new UnauthorizationError('Unauthorize access denied.');
        req.user = user;
        next();
    })(req, res, next);
}
