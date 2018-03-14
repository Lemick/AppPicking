/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import $ from 'jquery'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/popper.js/dist/popper.min.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './App.css';
  
import Category from './Category';
import Products from './Products';
import Product from './Product';

import Alerts from './components/Alerts';
import Orders from './components/Orders';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

/* App component */
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
        <Link className="navbar-brand" to="/">
            <img height="50px" src="https://sendeyo.com/up/108a9de7a43a024510fa65b8becb9148.svg"/>
        </Link>
          <div className="container">
            <ul className="navbar-nav nav-fill w-100">
              <li className="nav-item">
                <h5>
                  <Link className="nav-link" to="/orders">Voir les commandes</Link>
                </h5>
              </li>

              <li className="nav-item">
                <h5>
                  <Link className="nav-link" to="/alerts">Voir les alertes des stocks</Link>
                </h5>
              </li>
            </ul>
          </div>
        </nav>

        {/* Route components are rendered if the path prop matches the current URL */}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/orders" component={Orders} />
          <Route path="/alerts" component={Alerts} />
        </Switch>

      </div>
    )
  }
}

export default App;