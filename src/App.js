import React, { Component } from 'react';

import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Layout from './containers/layouts/layout';
import Checkout from './containers/checkout/checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/authentication/Auth';
import Logout from './containers/authentication/logout/Logout';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" exact component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
