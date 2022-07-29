<template>
  <div class="container mt-5" style="max-width: 600px; background-color: white;">
    <form @submit.prevent="onSubmit">
      <h3 style="padding-top: 10px;">Sign Up</h3>
      <div class="form-group">
        <label style="text-align: left; float: left;">Name</label>
        <input v-model="userName" type="text" class="form-control" placeholder="Name" />
      </div>
      <div class="form-group">
        <label style="text-align: left; float: left;">Email</label>
        <input v-model="userEmail" type="email" class="form-control" placeholder="Email" />
      </div>
      <div class="form-group">
        <label style="text-align: left; float: left;">Password</label>
        <input v-model="userPassword" type="password" class="form-control" placeholder="Password" />
      </div>
      <div class="form-group">
        <label style="text-align: left; float: left;">Confirm Password</label>
        <input
          v-model="confirmpassword"
          type="password"
          class="form-control"
          placeholder="Confirm Password"
        />
      </div>
      <button
        class="btn btn-primary btn-block"
        style="margin-top: 20px; margin-bottom: 10px;"
      >Sign Up</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      userName: "",
      userEmail: "",
      userPassword: "",
      confirmpassword: ""
    };
  },
  methods: {
    async onSubmit() {
      if (
        this.userName &&
        this.userEmail &&
        this.userPassword &&
        this.confirmpassword
      ) {
        if (this.userPassword == this.confirmpassword) {
          var user = {
            name: this.userName,
            email: this.userEmail,
            password: this.userPassword
          };
          try {
            const response = await axios.post(
              "http://localhost:8000/users/register",
              user
            );
            //console.log(response);
            console.log(response.data);
            if (response.status == 200) {
              alert("User has been successfully created");
              this.$router.push("/login");
            }
          } catch (error) {
            alert("This email already exist!");
          }
        } else {
          alert("Your passwords do not match!");
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
