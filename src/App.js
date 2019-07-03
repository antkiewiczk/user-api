import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// styles
import './App.scss';

// redux
import { addInitialUserData } from './actions/users';

// components
import UserList from './components/UserList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  componentWillMount = async () => {
    let users = [];
    await fetch('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(resp => resp.json())
      .then(resp => {
        if (Object.keys(resp).length === 0 || resp.length === 0) {
          this.setState(
            {
              isLoading: true,
            },
            () => {
              this.getInitialUserData();
            },
          );
        }
        this.setState({ isLoading: false });
        users = resp;
      });

    this.props.addInitialUserData(users);
  };

  getInitialUserData = async () => {
    const users = await fetch('https://randomuser.me/api/?results=20').then(
      resp => resp.json(),
    );

    let i = 1;
    users.results.forEach(user => {
      user.id = i;
      i += 1;
    });

    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(users.results),
    });

    this.setState(
      {
        isLoading: false,
      },
      this.props.addInitialUserData(users),
    );
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <noscript />;
    }

    return (
      <div className="app">
        <UserList onEditToggle={this.onEditToggle} />
      </div>
    );
  }
}

App.propTypes = {
  addInitialUserData: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    addInitialUserData,
  },
)(App);
