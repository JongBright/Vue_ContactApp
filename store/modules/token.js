import axios from 'axios'


const state = {
    token: '',
    loggedInUser: ''
}

const getters = {
    getToken: (state) => state.token,
    getLoggedInUser: (state) => state.loggedInUser
}

const actions = {

    updateTokenStatusAction: function ({ commit }, payload) {
        commit('mutateTokenStatus', payload)
    },

    async fetchAuthenticatedUser({ commit }) {

        const response = await axios.get("http://localhost:8000/users/me", {
            headers: { Authorization: "bearer " + state.token }
        });
        //console.log(response.data)
        commit('setLoggedInUser', response.data);
    }

}

const mutations = {
    mutateTokenStatus: function (state, payload) {
        state.token = payload
    },
    setLoggedInUser: (state, user) => (state.loggedInUser = user)
}



export default {
    state,
    getters,
    actions,
    mutations
}