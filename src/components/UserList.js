import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

class UserList extends Component {
  render() {
    const { users, onEditToggle, onDelete } = this.props;
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
        {users.map(user =>
          <UserListItem user={user} onEditToggle={onEditToggle} onDelete={onDelete}/>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array,
  onEditToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  users: [],
};

export default UserList;