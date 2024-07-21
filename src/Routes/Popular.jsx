import { getPopular } from '../api';
import MovieList from '../Components/Movie-list';

function Popular() {
  return <MovieList getMovies={getPopular} />;
}

export default Popular;
