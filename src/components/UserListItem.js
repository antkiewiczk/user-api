import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserListItem extends Component {
  render() {
    const { user, onEditToggle, onDelete } = this.props;
    return (
      <>
        <div className="userList-row" onClick={() => onEditToggle(user)}>
          <div>{user.name.title} {user.name.first} {user.name.last}</div>
          <div>{user.login.username}</div>
          <div>{user.gender}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div>{user.location.street}, {user.location.city}</div>
          <div><img src={user.picture.thumbnail} alt="user-thumbnail" /></div>
          <div><button className="button" onClick={e => onDelete(e, user.id)}>Delete</button></div>
        </div>
      </>
    );
  }
}

UserListItem.propTypes = {
  user: PropTypes.shape({}),
  onEditToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserListItem;