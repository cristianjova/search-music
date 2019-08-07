import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Index from './components/layouts/Index';
import Track from './components/tracks/Track';

import TracksState from './context/tracks/TracksState';

function App() {
  return (
    <TracksState>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route
                exact
                path='/lyrics/:id/:artist/:track'
                component={Track}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </TracksState>
  );
}

export default App;
