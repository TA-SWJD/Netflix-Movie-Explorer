<script setup>
import { ref } from "vue";
import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import router from "../router";

const pass = ref(false);
const pass2 = ref(true);
const username = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");

const registerUserByEmail = async () => {
  if (password1.value == password2.value) {
    pass.value = true;
    pass2.value = false;
  }
  if (password1.value !== password2.value) {
    pass.value = true;
    pass.value = true;
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password1.value);
  } catch (error) {
  }
};

const registerUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  router.push("/Movie");
};
</script>

<template>
  <div>
    <div class="homepage">
      <h2>REGISTER BY GOOGLE</h2>
      <button class="google" @click="registerUserByGoogle">Google</button>
      <hr />
      <h2>REGISTER BY EMAIL</h2>
      <form @submit.prevent="registerUserByEmail()">
        <input v-model="username" type="text" placeholder="username" /> <br />
        <input v-model="email" type="email" placeholder="email" /> <br />
        <input v-model="password1" type="password" placeholder="password" /> <br />
        <input v-model="password2" type="password" placeholder="re-enter password" /> <br />
        <input type="submit" value="Register" id="button" />
      </form>
      <router-link to="/Login" custom v-slot="{ navigate }" v-if="!Login">
        <button @click="navigate" role="link">Login</button>
      </router-link>
      <div class="authentication" v-if="pass && !pass2">
        <p>Register Successfully!</p>
      </div>
      <div class="authentication" v-if="pass && pass2">
        <p>Invalid Email or Password!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  color: white;
  background-image: url(../assets/Netflix.webp);
  background-size: auto;
  font-family: Georgia, 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
}

input {
  border-radius: 20px;
  height: 30px;
}

.google {
  width: 200px;
  height: 50px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: xx-large;
  font-weight: bold;
  border-radius: 20px;
}

.google:hover {
  background-color: black;
  color: white;
}

#button {
  width: 177px;
  height: 40px;
}

#button:hover {
  background-color: lightslategrey;
  color: antiquewhite;
}

button {
  width: 177px;
  height: 40px;
  border-radius: 20px;
}

button:hover {
  background-color: black;
  color: white;
}

.authentication {
  margin-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: black;
  font-weight: bold;
  color: red;
}
</style>
