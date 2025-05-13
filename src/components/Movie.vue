<script setup>
import axios from "axios";
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from "../store/index.js";

const store = useStore();
const genre = ref(28);
const criteria = ref("");
const searchResults = ref([]);
const page = ref(1);
const totalPages = ref(0);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (value) => {
  showModal.value = true;
  selectedId.value = value;
};

const closeModal = () => {
  showModal.value = false;
};

const getGenres = async () => {
  searchResults.value = [];
  criteria.value = "";
  await store.getMovies(genre.value);
};

const search = async (direction) => {
  page.value += direction;

  let data = (
    await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "d2efec38e7d74d12122672897f241cbf",
        query: criteria.value,
        include_adult: false,
        page: page.value,
      },
    })
  ).data;

  totalPages.value = data.total_pages;

  searchResults.value = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      release_date: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
    };
  });
};
</script>

<template>
  <input class="search" type="search" placeholder="Search:" v-model="criteria" @keydown.enter="search(0)" />
  <select class="select" v-model="genre" @change="getGenres()"> 
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="Adventure">Adventure</option>
    <option value="Fantasy">Fantasy</option>
  </select>
  <template v-if="searchResults.length">
    <div class="navigation">
      <button class="prev" v-show="page > 1" @click="search(-1)">Prev</button>
      <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
      <button class="next" v-show="page < totalPages" @click="search(1)">Next</button>
    </div>
  </template>
  <div class="purchase-container">
    <template v-if="searchResults.length">
      <img class="poster" v-for="movie in searchResults" :id="movie.id" @click="openModal(movie)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
    </template>
    <template v-else>
      <img class="poster" v-for="movie in store.movies" :id="movie.id" @click="openModal(movie)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
    </template>
    <Modal v-if="showModal" @toggleModal="closeModal()" :value="selectedId" />
  </div>
</template>

<style scoped>
button {
  border-radius: 10px;
  margin-top: 10px;
  width: 100px;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: larger;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

button:hover {
  background-color: black;
  color: white;
}

.search {
  width: 400px;
  height: 50px;
  font-size: xx-large;
}

.search:hover {
  background-color: black;
  color: white;
}

.select{
  float: right;
  width: 180px;
  height: 50px;
  font-size: xx-large;
}

.select:hover{
  background-color: black;
  color: white;
}

h1 {
  display: inline-block;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

p {
  color: white;
  padding-top: 10px;
  padding-left: 5px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: medium;
  font-weight: bold;
}

.purchase-container {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto auto auto auto;
  background-color: black;
  max-width: max-content;
}

.poster {
  aspect-ratio: 3/4;
  width: 97.5%;
  height: 90%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
}
</style>
