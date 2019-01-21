import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Login,
  Dashboard,
  Students,
  Groups,
  SingleStudent,
  AddNote,
  AddMultipleNotes
} from "./components";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={Login} />

        {isLoggedIn && (
          <Switch>
            <Route path="/add" component={AddNote} />
            <Route path="/groupAdd" component={AddMultipleNotes} />
            <Route path="/students/:id" component={SingleStudent} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/students" component={Students} />
            <Route path="/groups" component={Groups} />
          </Switch>
        )}

        <Route path="/" component={Dashboard} />
      </Switch>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
});

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
