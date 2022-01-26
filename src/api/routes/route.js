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
        if (route.path === '/api') {
            app.get(route.path, route.router);
        } else {
            app.use('/api' + route.path, route.router);
        }
    });
};
