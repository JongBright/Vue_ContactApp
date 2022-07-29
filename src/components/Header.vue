<template>
  <div>
    <nav
      v-if="getToken"
      class="navbar navbar-expand navbar-light fixed-top"
      style="background-color: white;"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand">Contact App</router-link>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/contacts" class="nav-link">Contacts</router-link>
            </li>
            <li class="nav-item">
              <a @click="handleLogout" href="#" class="nav-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav
      v-if="!getToken"
      class="navbar navbar-expand navbar-light fixed-top"
      style="background-color: white;"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["updateTokenStatusAction"]),

    handleLogout() {
      this.updateTokenStatusAction("");
      this.$router.push("/");
      alert("You have been logged out successfully");
    }
  },
  props: {}
};
</script>


<style scoped>
</style>
