import React, { Fragment, Component } from 'react';
import Modal from './../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }
    render() {
      return (
        <Fragment>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
