import React from 'react';
import {HashRouter, Route, Link, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Nav from './Nav';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <div id='app'>
            <Nav />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
