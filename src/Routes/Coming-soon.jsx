import { getComingSoon } from '../api';
import MovieList from '../Components/Movie-list';

function ComingSoon() {
  return <MovieList getMovies={getComingSoon} />;
}

export default ComingSoon;
