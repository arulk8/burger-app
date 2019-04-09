import React, { Component } from 'react';

import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Layout from './containers/layouts/layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
