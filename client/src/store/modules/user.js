
const user = {
    state: () => ({
        user: {},
    }),
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        },
    },
    getters: {
        GET_USER: (state) => state.user,
    },
    actions: {
        
    },
};

export default user;
