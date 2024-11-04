//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: movie/now_playing?api_key=d7d89328032b3e4d02777a8ab713e7b3

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
