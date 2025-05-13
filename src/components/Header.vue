<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const navigate = (link) => {
  router.push(link);
}

const props = defineProps({
  Login: Boolean,
});

</script>

<template>
  <div class="main">
    <div class="bar">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/2560px-Netflix_logo.svg.png"
        width="160" height="75" />
      <img src="https://cdn-images-1.medium.com/max/1200/1*ty4NvNrGg4ReETxqU2N3Og.png" width="100" height="75" />
      <router-link to="/Login" custom v-slot="{ navigate }" v-if="!Login">
        <button @click="navigate" role="link">Login</button>
      </router-link>
      <router-link to="/Register" custom v-slot="{ navigate }" v-if="!Login">
        <button @click="navigate" role="link">Register</button>
      </router-link>
      <router-link to="/Cart" custom v-slot="{ navigate }" v-if="Login">
        <img src="../assets/cart.png" @click="navigate" role="link" class="cart">
      </router-link>
      <router-link to="/" custom v-slot="{ navigate }" v-if="Login">
        <button @click="navigate" role="link">Log-out</button>
      </router-link>
      <router-link to="/Movie" custom v-slot="{ navigate }" v-if="Login">
        <button @click="navigate" role="link">Movies</button>
      </router-link>
      <router-link to="/LoginHome" custom v-slot="{ navigate }" v-if="Login">
        <button @click="navigate" role="link">Home</button>
      </router-link>
    </div>
    <img src="../assets/Bar.png" class="intro">
  </div>
</template>

<style scoped>
.main {
  margin-top: 0%;
  background-color: darkgray;
}

.bar {
  background-color: black;
  padding-top: 5px;
  padding-left: 5px;
}

.bar>button {
  border-radius: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: red;
  color: white;
  font-size: 30px;
  margin-right: 10px;
  float: right;
  height: 75px;
  width: 200px;
  margin-top: 0%;
}

button:hover {
  font-family: Georgia, 'Times New Roman', Times, serif;
  background-color: darkred;
}

.intro {
  padding-top: 5px;
  height: auto;
  max-width: 100%;
}

.cart {
  padding-right: 5%;
  float: right;
  height: 75px;
  width: 75px;
}
</style>