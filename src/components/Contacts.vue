<template>
  <div class="container" style="max-width: 900px;">
    <div v-if="getToken">
      <table class="table table-bordered mt-5" style="background-color: white;">
        <thead>
          <tr>
            <th scope="col" style="width: 250px">Contact</th>
            <th scope="col" style="width: 250px">Phone</th>
            <th scope="col" class="text-center" style="width: 150px"></th>
            <th scope="col" class="text-center" style="width: 150px"></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="contact.id" v-for="contact in allContacts">
            <td>
              <span>{{ contact.name }}</span>
            </td>
            <td>
              <span>{{ contact.phone }}</span>
            </td>
            <td class="text-center">
              <div>
                <button class="btn btn-warning" @click="editContact(contact.id)">Edit</button>
              </div>
            </td>
            <td class="text-center">
              <div>
                <button class="btn btn-danger" @click="removeContact(contact.id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!getToken" class="container" style="max-width: 500px; background-color: white;">
      <div class="auth-wrapper" style="padding: 80px;">
        <div class="auth-inner">
          <h3>You are not logged in. Login to have access to this.</h3>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Contacts",
  computed: mapGetters(["allContacts", "getToken"]),
  methods: {
    ...mapActions([
      "updateTargetContactStatusAction",
      "fetchContacts",
      "deleteContact"
    ]),

    async editContact(id) {
      //this.fetchContact(id.toString());
      const response = await axios.get(
        `http://localhost:8080/contacts/${id.toString()}`
      );
      if (response.status == 200) {
        console.log(response.data);
        this.updateTargetContactStatusAction(response.data);
        this.$router.push("/edit-contact");
      }
    },
    async removeContact(id) {
      this.deleteContact(id.toString());
      this.fetchContacts(); //or fetch manually with axios
      this.$router.push("/");
    }
  },
  created() {
    this.fetchContacts();
  },
  props: {}
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>