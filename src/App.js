import React, { Component } from 'react';

import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Layout from './containers/layouts/layout';
import Checkout from './containers/checkout/checkout';
import { Route, Switch, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/authentication/Auth';
import Logout from './containers/authentication/logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
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

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
