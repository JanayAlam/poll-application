import axios from 'axios';

const auth = {
    state: () => ({
        token: null,
    }),
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
    },
    getters: {
        GET_TOKEN: (state) => state.token,
        GET_IS_AUTHENTICATED: (state) => !!state.token,
    },
    actions: {
        login: async ({ commit }, { username, password, rememberMe }) => {
            try {
                const response = await axios.post('/auth/login', {
                    username,
                    password,
                });
                commit('SET_TOKEN', response.data.token);
                commit('SET_USER', response.data.user);
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        register: async (
            { commit },
            { firstName, lastName, email, username, password, confirmPassword }
        ) => {
            try {
                const response = await axios.post('/auth/register', {
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                    confirmPassword,
                });
                commit('SET_TOKEN', response.data.token);
                commit('SET_USER', response.data.user);
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        logout: ({ commit }) => {
            commit('SET_TOKEN', null);
            commit('SET_USER', {});
        },
        attempt: async ({ commit, state }, token) => {
            if (token) {
                commit('SET_TOKEN', token);
            }
            if (!state.token) return;
            try {
                const response = await axios.get('/auth/get-me');
                commit('SET_USER', response.data.user);
            } catch (error) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },
        forgetPassword: async (_, { email }) => {
            try {
                await axios.patch('/auth/forget-password', {
                    email,
                });
                return true;
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        resetPassword: async (
            _,
            { password, confirmPassword, userId, token }
        ) => {
            try {
                await axios.patch(`/auth/reset-password/u/${userId}/t/${token}`, {
                    newPassword: password,
                    confirmPassword: confirmPassword,
                });
                return true;
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
    },
};

export default auth;
