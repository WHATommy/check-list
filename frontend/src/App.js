import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import { Provider } from 'react-redux';
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <div className='App'>
          <Route exact path='/' component={Landing} />
        </div>
      </Router>
    </Provider>
  )
}

export default App;
