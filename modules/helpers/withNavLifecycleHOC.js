import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

function withNavLifecycle(componentDidMountInNav, componentWillUnmountInNav) {
  return function(WrappedComponent, routeName) {
    class HOC extends Component {
      constructor(props) {
        super(props);
        this.routeName = routeName;
      }

      componentDidMount() {
        if (
          this.props.currentRouteName === this.routeName
          && _.isFunction(componentDidMountInNav)
        ) {
          componentDidMountInNav(this.props);
        }
      }

      componentWillReceiveProps(nextProps) {
        if (
          this.props.currentRouteName !== this.routeName
          && nextProps.currentRouteName === this.routeName
          && _.isFunction(componentDidMountInNav)
        ) {
          componentDidMountInNav(this.props);
        }

        if (
          this.props.currentRouteName === this.routeName
          && nextProps.currentRouteName !== this.routeName
          && _.isFunction(componentWillUnmountInNav)
        ) {
          componentWillUnmountInNav(this.props);
        }
      }

      componentWillUnmount() {
        if (_.isFunction(componentWillUnmountInNav)) {
          componentWillUnmountInNav(this.props);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    };

    const mapStateToProps = (state, ownProps) => {
      return { currentRouteName: state.nav.currentRouteName };
    };

    return connect(mapStateToProps)(HOC);
  };
}

export default withNavLifecycle;
