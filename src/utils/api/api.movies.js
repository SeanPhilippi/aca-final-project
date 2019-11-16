import axios from 'axios';

export const get = {
  movie: id => axios(`/api/movies/id/${ id }`), // api call to omdb
  topMoviesList: () => axios('/api/movies/top-movies-list'),
};

export const put = {
  movie: (movieId, movie) => axios.put(`/api/movies/update/${ movieId }`, movie),
};