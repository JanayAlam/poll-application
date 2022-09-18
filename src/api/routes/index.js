const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

// all the root routes
const routes = [
    {
        path: '/auth',
        router: authRouter,
    },
    {
        path: '/users',
        router: userRouter,
    },
];

// exporting the routes with basic prefix
module.exports = (app) => {
    routes.forEach((route) => {
        if (route.path === '/api/v1') {
            app.get(route.path, route.router);
        } else {
            app.use('/api/v1' + route.path, route.router);
        }
    });
};
