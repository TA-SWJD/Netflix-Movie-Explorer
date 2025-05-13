import { firestore } from "../firebase/index";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { defineStore } from 'pinia'
import axios from 'axios';
import { ref } from 'vue';

export const useStore = defineStore('store', {
  state: () => {
    return {
      movies: [],
      cart: new Map(),
    }
  },
  actions: {
    async populateFirestore() {
      const genres = new Map([[28, "Action"], [10751, "Family"], [878, "Science Fiction"], [12, "Adventure"], [14, "Fantasy"]]);

      genres.forEach(async (value, key) => {
        let data = (await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "d2efec38e7d74d12122672897f241cbf",
            with_genres: key,
            include_adult: false,
          }
        })).data.results;
        data = data.map((movie) => {
          return {
            id: movie.id,
            poster: movie.poster_path,
          }
        });
        await setDoc(doc(firestore, "Genre", value), { data });
      });
    },
    
    async getMovies(genre) {
      this.movies = (await getDoc(doc(firestore, "Genre", genre))).data().data;
    },

    addToCart(id, data) {
      this.cart.set(id, data);
    },

    removeFromCart(id) {
      this.cart.delete(id);
    }
  }
});

export const isLoggedIn = ref(false);