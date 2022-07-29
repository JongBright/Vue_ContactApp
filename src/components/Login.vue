<template>
  <div class="container mt-5" style="max-width: 600px; background-color: white; float: center;">
    <form @submit.prevent="onSubmit">
      <h3 style="padding-top: 10px;">Login</h3>
      <div class="form-group">
        <label style="text-align: left; float: left;">Email</label>
        <input v-model="userEmail" type="email" class="form-control" placeholder="Email" />
      </div>
      <div class="form-group">
        <label style="text-align: left; float: left;">Password</label>
        <input v-model="userPassword" type="password" class="form-control" placeholder="Password" />
      </div>
      <button class="btn btn-primary btn-block" style="margin-top: 20px; margin-bottom: 10px;">Login</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      userEmail: "",
      userPassword: ""
    };
  },
  methods: {
    ...mapActions(["updateTokenStatusAction"]),
    async onSubmit() {
      if (this.userEmail && this.userPassword) {
        var user = {
          email: this.userEmail,
          password: this.userPassword
        };

        try {
          const response = await axios.post(
            "http://localhost:8000/users/login",
            user
          );
          if (response.status == 200) {
            console.log(response.data);
            var token = response.data.access_token;
            this.updateTokenStatusAction(token);
            this.$router.push("/");
            alert("You have successfully logged in");
          }
        } catch (error) {
          alert("Wrong credentials!");
        }
      } else {
        alert("Fill all required fields!");
      }
    }
  },
  props: {}
};
</script>


<style scoped>
</style>
