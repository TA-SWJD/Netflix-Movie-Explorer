<script setup>
import axios from "axios";
import { useStore } from "../store/index.js";
const props = defineProps(["value"]);
const emits = defineEmits(["toggleModal"]);
const store = useStore();

let data = (
  await axios.get(`https://api.themoviedb.org/3/movie/${props.value.id}`, {
    params: {
      api_key: "d2efec38e7d74d12122672897f241cbf",
      include_adult: "false",
    },
  })
).data;
</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="emits('toggleModal')">
      <div class="modal-inner-container">
        <img :src="'https://image.tmdb.org/t/p/w500' + props.value.poster" class="image">
        <button class="close-button" @click="emits('toggleModal')">Close</button>
        <h1>{{ data.title }}</h1>
        <p>
          Release Date: {{ data.release_date }} <br />
          <br /> Overview: {{ data.overview }}
        </p>
        <button @click="store.addToCart(props.value.id, {
          id: data.id,
          poster: data.poster_path,
          title: data.title,
          date: data.release_date,
        })">Add To Cart</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.image {
  padding-top: 40px;
  height: 60%;
  aspect-ratio: 3/4;
  float: left;
  border-radius: 10px;
  margin: 10px;
}

.modal-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 3;
}

.modal-outer-container .modal-inner-container {
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 15px;
  background-color: aliceblue;
  width: clamp(280px, 100%, 800px);
  height: 400px;
  position: relative;
}

.modal-outer-container .modal-inner-container .close-button {
  border-radius: 10px;
  position: absolute;
  right: 0px;
  padding: 1rem;
  background: #1F2123;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
}

.modal-outer-container .close-button {
  width: 10vw;
}

p {
  padding-left: 10px;
  font-size: x-large;
}

button {
  font-size: medium;
  border-radius: 10px;
  width: 200px;
  height: 60px;
  color: white;
  background-color: black;
}

button:hover {
  color: black;
  background-color: white;
}

.message {
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: red;
  display: inline;
}
</style>
