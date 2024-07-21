import { useQuery } from 'react-query';
import styled from 'styled-components';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { makeImagePath } from '../api';
import { useNavigate, useMatch } from 'react-router-dom';

// Styled components
const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  display: grid;
  gap: 60px;
  padding: 60px;
  grid-template-columns: repeat(3, 1fr);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 700px;
  color: red;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 20px;
`;

const Info = styled(motion.div)`
  padding: 10px;
  color: white;
  h4 {
    text-align: center;
    font-size: 30px;
    font-weight: 600;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 30vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: black;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 2.5rem;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.white.lighter};
  }
`;

const boxVariants = {
  normal: {
    y: 0,
  },
  hover: {
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: 'tween',
    },
  },
};

function MovieList({ getMovies }) {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/movies/:movieId');
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery(['movies', 'list'], getMovies);

  const onBoxClicked = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => navigate('/');

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <List>
            {data?.results.map((movie) => (
              <Container key={movie.id}>
                <Box
                  layoutId={movie.id + ''}
                  initial="normal"
                  whileHover="hover"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(movie.id)}
                  bgPhoto={makeImagePath(movie.poster_path || '', 'w500')}
                />
                <Info>
                  <h4>{movie.title}</h4>
                </Info>
              </Container>
            ))}
          </List>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>

                      <CloseButton onClick={onOverlayClick}>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                          ></path>
                        </svg>
                      </CloseButton>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default MovieList;
