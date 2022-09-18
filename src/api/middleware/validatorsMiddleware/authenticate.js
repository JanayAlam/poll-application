const express = require('express');
const passport = require('passport');
const { UnauthorizationError } = require('../../errors/apiErrors');

/**
 * authenticate the user
 * @param {express.Request} req the request object provided by express
 * @param {express.Response} res the request object provided by express
 * @param {Function} next the request object provided by express
 */
module.exports = (req, res, next) => {
    passport.authenticate('jwt', function (err, user, _info) {
        if (err) return next(err);
        if (!user) throw new UnauthorizationError('Unauthorize access denied');
        req.user = user;
        next();
    })(req, res, next);
};
