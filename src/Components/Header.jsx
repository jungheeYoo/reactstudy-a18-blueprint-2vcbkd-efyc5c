import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const Nav = styled.nav`
  display: flex;
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 80px;
`;

const Item = styled.li`
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative; // Circle
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  top: 30px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

function Header() {
  const popularMatch = useMatch('/');
  const comingSoonMatch = useMatch('/ComingSoon');
  const nowPlayingMatch = useMatch('/NowPlaying');

  return (
    <Nav>
      <Items>
        <Item>
          <Link to="/">
            POPULAR {popularMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to="/ComingSoon">
            COMING SOON {comingSoonMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to="/NowPlaying">
            NOW PLAYING {nowPlayingMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Items>
    </Nav>
  );
}

export default Header;
