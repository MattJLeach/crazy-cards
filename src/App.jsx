import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';

import HomePage from './components/homepage/homepage';
import Application from './components/application/application';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/application" exact component={Application} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;