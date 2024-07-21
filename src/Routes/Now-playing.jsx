import { getNowPlaying } from '../api';
import MovieList from '../Components/Movie-list';

function NowPlaying() {
  return <MovieList getMovies={getNowPlaying} />;
}

export default NowPlaying;
