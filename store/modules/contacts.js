import axios from 'axios'





const state = {
    contacts: [],
    targetContact: {}

}




const getters = {
    allContacts: (state) => state.contacts,
    getTargetContact: (state) => state.targetContact
}




const actions = {


    updateTargetContactStatusAction: function ({ commit }, payload) {
        commit('mutateTargetContactStatus', payload)
    },

    async fetchContacts({ commit }) {
        const response = await axios.get("http://localhost:8080/contacts");
        //console.log(response.data)
        commit('setContacts', response.data);
    },


    // async fetchContact({ commit }, id) {
    //     const response = await axios.get(`http://localhost:8080/contacts/${id}`);
    //     //console.log(response.data)
    //     commit('setTargetContact', response.data);
    // },


    async addContact({ commit }, contact) {
        //console.log(contact)
        try {
            const response = await axios.post("http://localhost:8080/contacts/create/", contact);
            console.log(response.data)
            if (response.status == 200) {
                commit('addNewContact', response.data);
                alert("Contact created");
            }
        } catch (error) {
            console.log(error);
            alert("This phone number already exist!");
        }

    },


    async updateContact({ commit }, contact) {
        console.log(contact)
        try {
            const response = await axios.post(
                `http://localhost:8080/contacts/create/`,
                { name: contact.name, phone: contact.phone }
            );
            if (response.status == 200) {
                commit('editContact', contact);
                alert("Contact updated");
            }
        } catch (error) {
            console.log(error);
        }

    },


    async deleteContact({ commit }, id) {
        console.log(id)
        try {
            const response = await axios.delete(
                `http://localhost:8080/contacts/delete/${id}`
            );
            if (response.status == 200) {
                commit('removeContact', id);
                alert("Contact deleted");
            }
        } catch (error) {
            console.log(error);
        }

    }

}




const mutations = {


    mutateTargetContactStatus: function (state, payload) {
        state.targetContact = payload
    },

    setContacts: (state, fetchedContacts) => (state.contacts = fetchedContacts),

    // setTargetContact: (state, fetchedContact) => (state.targetContact = fetchedContact),

    addNewContact: (state, newContact) => state.contacts.push(newContact),

    editContact: (state, editedContact) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== editedContact.id)
        state.contacts.unshift(editedContact)
    },

    removeContact: (state, contactID) => state.contacts = state.contacts.filter((contact) => contact.id !== contactID)


}









export default {
    state,
    getters,
    actions,
    mutations
}