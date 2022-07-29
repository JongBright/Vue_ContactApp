<template>
  <div>
    <div v-if="getToken" class="container mt-5" style="max-width: 800px; background-color: white">
      <form @submit.prevent="onSubmit">
        <h3 style="padding-top: 10px;">Edit Contact</h3>
        <div class="form-group">
          <label style="text-align: left; float: left;">Name</label>
          <input v-model="contactName" type="text" class="form-control" placeholder="Name" />
        </div>
        <div class="form-group">
          <label style="text-align: left; float: left;">Phone</label>
          <input v-model="contactPhone" type="number" class="form-control" placeholder="Phone" />
        </div>
        <button
          class="btn btn-primary btn-block"
          style="margin-top: 20px; margin-bottom: 10px;"
        >Update</button>
      </form>
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
  name: "Home",
  data() {
    return {
      contactId: "",
      contactName: "",
      contactPhone: ""
    };
  },
  computed: mapGetters(["getToken", "getTargetContact"]),
  methods: {
    ...mapActions(["updateContact", "deleteContact"]),
    async onSubmit() {
      const response = await axios.delete(
        `http://localhost:8080/contacts/delete/${this.contactId.toString()}`
      );
      this.updateContact({
        id: this.contactId,
        name: this.contactName,
        phone: this.contactPhone.toString()
      });
      this.$router.push("/contacts");
    }
  },
  created() {
    this.contactId = this.$store.getters.getTargetContact.id;
    this.contactName = this.$store.getters.getTargetContact.name;
    this.contactPhone = this.$store.getters.getTargetContact.phone;
  },
  props: {}
};
</script>


<style scoped>
</style>
