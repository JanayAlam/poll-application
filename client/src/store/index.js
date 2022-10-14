import { createStore } from 'vuex';
import auth from './modules/auth.js';
import user from './modules/user.js';

const store = createStore({
    modules: {
        auth,
        user,
    },
});

export default store;
