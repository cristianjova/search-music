import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Index from './components/layouts/Index';
import Track from './components/tracks/Track';
import InfoSingular from './components/tracks/InfoSingular';

import TracksState from './context/tracks/TracksState';

function App() {
  return (
    <TracksState>
      <Router>
        <Fragment>
          <Navbar />
          <div
            className='container'
            style={{ minHeight: 'calc(100vh - 85px)' }}
          >
            <Switch>
              <Route exact path='/' component={Index} />
              <Route
                exact
                path='/lyrics/:id/:artist/:track'
                component={Track}
              />
              <Route
                exact
                path='/artist/:artist_name'
                component={InfoSingular}
              />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    </TracksState>
  );
}

export default App;
