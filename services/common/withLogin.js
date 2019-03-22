import React, { Component } from 'react';
import Login from '../../screens/Login';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';

export default function withLogin(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      if (this.props.monitor.loginData) return <WrappedComponent {...this.props} />;
      else return <Login {...this.props} />;
    }
  };
}
