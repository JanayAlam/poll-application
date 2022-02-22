// Importing routes.
import authRouter from './authRouter';
import userRouter from './userRouter';

// All the root routes.
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

// Exporting the routes with basic prefix.
export default app => {
    routes.forEach((route) => {
        if (route.path === '/api/v1') {
            app.get(route.path, route.router);
        } else {
            app.use('/api/v1' + route.path, route.router);
        }
    });
};
