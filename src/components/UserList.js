import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import UserListItem from './UserListItem';
import EditUserModal from './EditUserModal';

// redux
import { updateUser, deleteUser } from '../actions/users';

class UserList extends Component {
  constructor() {
    super();

    this.state = {
      editingUser: {},
      modalOpened: false,
    };
  }

  onDelete = async (e, id) => {
    e.stopPropagation();

    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    this.props.deleteUser(id);
  };

  onEditToggle = user => {
    this.setState({
      modalOpened: !this.state.modalOpened,
      editingUser: user,
    });
  };

  onFormSubmit = async user => {
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      this.props.updateUser(user);
      this.setState({
        modalOpened: false,
      });
    }
  };

  render() {
    const { modalOpened, editingUser } = this.state;
    const { users } = this.props;

    return (
      <div className="userList">
        <div className="userList-row userList-header">
          <div>Full name</div>
          <div>Username</div>
          <div>Gender</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Location</div>
          <div>Photo</div>
          <div />
        </div>
        {users.map(user => (
          <UserListItem
            key={user.id}
            user={user}
            onEditToggle={this.onEditToggle}
            onDelete={this.onDelete}
          />
        ))}

        {modalOpened && (
          <EditUserModal
            display={modalOpened}
            editingUser={editingUser}
            onModalToggle={this.onEditToggle}
            onFormSubmit={this.onFormSubmit}
          />
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  users: [],
};

const mapState = state => ({ users: state.users.data });

export default connect(
  mapState,
  { deleteUser, updateUser },
)(UserList);
