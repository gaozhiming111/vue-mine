import { createStore } from 'vuex';

const store = createStore({
    state() { 
        return {
            username: '',
            password: ''
        }
    },
    getters: {
        getUser(state) { 
            return state.username;
        }
    },
    mutations: {
        saveUser(state, payload) { 
            state.username = payload;
        }
    },
    actions: {
        asyncSaveUser({ commit }) { 
            setTimeout(() => { 
                commit('saveUser');
            },1000);
        }
    }
});

export default store;