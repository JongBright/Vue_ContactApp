<template>
  <div>
    <h4 v-if="getToken" style="color: white;">
      Welcome,
      <b>{{ getLoggedInUser.name }}</b>. Fill the form below, to create a new contact.
    </h4>
    <div v-if="getToken" class="container mt-5" style="max-width: 800px; background-color: white">
      <form @submit.prevent="onSubmit">
        <h3 style="padding-top: 10px;">Contact</h3>
        <div class="form-group">
          <label style="text-align: left; float: left;">Name</label>
          <input v-model="userName" type="text" class="form-control" placeholder="Name" />
        </div>
        <div class="form-group">
          <label style="text-align: left; float: left;">Phone</label>
          <input v-model="userPhone" type="number" class="form-control" placeholder="Phone" />
        </div>
        <button
          class="btn btn-primary btn-block"
          style="margin-top: 20px; margin-bottom: 10px;"
        >Create</button>
      </form>
    </div>
    <div v-if="!getToken" class="container" style="max-width: 500px; background-color: white;">
      <div class="auth-wrapper" style="padding: 80px;">
        <div class="auth-inner">
          <h3>
            Welcome. Click
            <b>Sign Up</b> to create an account, or
            <b>Login</b> if you already have an account.
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      userName: "",
      userPhone: ""
    };
  },
  computed: mapGetters(["getToken", "getLoggedInUser"]),
  methods: {
    ...mapActions(["fetchAuthenticatedUser", "fetchContacts", "addContact"]),
    async onSubmit() {
      if (this.userName && this.userPhone) {
        this.addContact({
          name: this.userName,
          phone: this.userPhone.toString()
        });
      } else {
        alert("Fill all required fields!");
      }
    }
  },
  created() {
    this.fetchAuthenticatedUser();
    this.fetchContacts();
  },
  props: {}
};
</script>


<style scoped>
</style>
