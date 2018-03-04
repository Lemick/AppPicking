/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Category from './Category';
import Products from './Products';
import Product from './Product';

import Alerts from './components/Alerts';
import PickingGenerator from './components/PickingGenerator';

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
    console.log('hey ' + this.state.users);
  }


  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-danger"> <Link className="navbar-brand" to="/">HuitNeufDix</Link>
          <div class="container">
              <ul class="navbar-nav nav-fill w-100">
                <li class="nav-item">
                  <Link className="nav-link" to="/pickingGeneration">Génerer un groupement de commande</Link>
                </li>

                <li class="nav-item">
                  <Link className="nav-link" to="/alerts">Voir les alertes des stocks</Link>
                </li>
              </ul>
          </div>
        </nav>


        {/* Route components are rendered if the path prop matches the current URL */}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pickingGeneration" component={PickingGenerator} />
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