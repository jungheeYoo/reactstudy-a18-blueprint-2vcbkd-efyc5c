const API_KEY = '0a06d67ddbfb0da39994d1abc5bc457a';
const BASE_URL = 'https://api.themoviedb.org/3';

export function getPopular() {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getNowPlaying() {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getComingSoon() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMoviesDetails(movieId) {
  return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function makeImagePath(id, format = 'original') {
  return `https://image.tmdb.org/t/p/${format}/${id}`;
}
