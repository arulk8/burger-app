import React, { Component } from 'react';

import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Layout from './containers/layouts/layout';
import Checkout from './containers/checkout/checkout';
import { Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
