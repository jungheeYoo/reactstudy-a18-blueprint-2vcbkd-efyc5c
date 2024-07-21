import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import ComingSoon from './Routes/Coming-soon';
import NowPlaying from './Routes/Now-playing';
import Popular from './Routes/Popular';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/ComingSoon">
          <ComingSoon />
        </Route>
        <Route path="/NowPlaying">
          <NowPlaying />
        </Route>
        <Route path={['/', '/movies/:movieId']}>
          <Popular />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
