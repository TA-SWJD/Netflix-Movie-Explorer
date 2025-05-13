<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggedIn } from "../store/index";
import { auth } from '../firebase/index.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter();
const email = ref("");
const password = ref("");
const data = ref(false);
const submitted = ref(false);

const login = () => {
  submitted.value = true;
  try {
    signInWithEmailAndPassword(auth, email.value, password.value).then(() => {
      data.value = true;
      router.push('/Movie');
      isLoggedIn.value = true;
    });
  } catch (e) {
    data.value = false;
  }
}
</script>

<template>
  <div class="homepage">
    <img src="https://cdn-images-1.medium.com/max/1200/1*ty4NvNrGg4ReETxqU2N3Og.png" width="140" height="100">
    <p>Welcome to Netflix <br> Unlimited movies, TV shows, and more.</p>
    <form @submit.prevent="login()">
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Gmail" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Login" id="button" />
      <router-link to="/Register" custom v-slot="{ navigate }" v-if="!Login">
        <button @click="navigate" role="link">Register</button>
      </router-link>
    </form>
    <div class="error" v-if="submitted && !data && !isLoggedIn">
      <p>Invalid Username or Password</p>
    </div>
  </div>
</template>

<style scoped>
.logo {
  align-items: center;
  justify-content: center;
}

.homepage {
  color: white;
  background-image: url(../assets/Netflix.webp);
  background-size: auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 2.5rem;
}

.homepage>p {
  text-align: center;
}

.homepage>.error {
  border-radius: 20px;
  color: red;
  font-size: 20px;
  margin-top: 20px;
  font-family: monospace;
  background-color: black;
}

.homepage>form>input {
  padding: 5px;
  border-radius: 20px;
  width: 200px;
  height: 25px;
}

#button {
  width: 215px;
  height: 30px;
  margin-top: 10px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  background-color: white;
  color: black;
}

#button:hover {
  background-color: black;
  color: white;
}

button {
  width: 215px;
  height: 30px;
  margin-top: 10px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  background-color: white;
  color: black;
  border-radius: 20px;
}

button:hover {
  background-color: black;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
}
</style>