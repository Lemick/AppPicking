/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Category from './Category';
import Products from './Products';
import Product from './Product';

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
  
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
      console.log('hey ' + this.state.users);
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">

            /* Link components are used for linking to other views */
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>

          </ul>
        </nav>

        /* Route components are rendered if the path prop matches the current URL */

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/category" component={Category} />
          <Route path="/products" component={Products} />
        </Switch>

        <div className="App">
          <h1>Users</h1>
          { this.state.users.map(user => <div key={user.id}>{user.username}</div>  )}
        </div>
      </div>
    )
  }
}

export default App;