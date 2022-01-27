const express = require('express');

// Importing routes
const authRouter = require('./includes/authRouter');

const routes = [
    {
        path: '/auth',
        router: authRouter,
    },
];

module.exports = (app) => {
    routes.forEach((route) => {
        if (route.path === '/api/v1') {
            app.get(route.path, route.router);
        } else {
            app.use('/api/v1' + route.path, route.router);
        }
    });
};
