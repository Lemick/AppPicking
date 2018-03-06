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

  state = { users: [] }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> <Link className="navbar-brand" to="/">HuitNeufDix</Link>
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


        { /**
        <div className="App">
          <h1>Users</h1>
          { this.state.users.map(user => <div key={user.id}>{user.username}</div>  )}
        </div>
        **/}

      </div>
    )
  }
}

export default App;