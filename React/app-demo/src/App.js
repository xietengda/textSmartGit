import { BrowserRouter as Router, Route } from "react-router-dom";

import React, { Component } from 'react';



import Home from './components/Home';
import Pcontent from './components/Pcontent';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/Pcontent/:id" component={Pcontent} />
        </div>
      </Router>
    );
  }
}

export default App;
