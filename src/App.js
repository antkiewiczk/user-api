import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// styles
import './App.scss';

// redux
import { addInitialUserData, updateUser, deleteUser } from './actions/users';

// components
import UserList from './components/UserList';
import EditUserModal from './components/EditUserModal';

class App extends Component {
  constructor() {
    super()

    this.state = {
      modalOpened: false,
      editingUser: {},
      users: [],
    }
  }

  componentWillMount = async () => {
    let users = [];
    await fetch('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.length) {
          return this.getInitialUserData();
        }
        this.setState({
          users: resp,
        })
        users = resp;
      })

    this.props.addInitialUserData(users);
  }

  getInitialUserData = async () => {
    const users = await fetch('https://randomuser.me/api/?results=10')
      .then(resp => resp.json());

    let i = 1;
    users.results.forEach(user => {
      user.id = i;
      i++
    })

    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(users.results)
    });

    this.props.addInitialUserData(users);
  }

  onEditToggle = user => {
    this.setState({
      modalOpened: !this.state.modalOpened,
      editingUser: user,
    })
  }

  onFormSubmit = async user => {
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      this.props.updateUser(user);
      this.setState({
        modalOpened: false,
      });
    }
  }

  onDelete = async (e, id) => {
    e.stopPropagation();

    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
    this.props.deleteUser(id);
  }

  render() {
    const { modalOpened, editingUser } = this.state;
    const { users } = this.props;

    if (!users.length) {
      return <noscript />;
    }
    return (
      <div className="App">
        <UserList users={users} onEditToggle={this.onEditToggle} onDelete={this.onDelete} />
        {modalOpened && <EditUserModal display={modalOpened} editingUser={editingUser} onModalToggle={this.onEditToggle} onFormSubmit={this.onFormSubmit} />}
      </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired
}

App.defaultProps = {
  users: [],
}

const mapState = state => {
  return { users: state.users.data };
}

export default connect(mapState, {
  addInitialUserData, updateUser, deleteUser
})(App);
