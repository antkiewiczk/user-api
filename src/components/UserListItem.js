import React from 'react';
import PropTypes from 'prop-types';

const UserListItem = props => {
  const { user, onEditToggle, onDelete } = props;
  return (
    // eslint-disable-next-line
    <div className="userList-row" onClick={() => onEditToggle(user)}>
      <div>
        {user.name.title} {user.name.first} {user.name.last}
      </div>
      <div>{user.login.username}</div>
      <div>{user.gender}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>
        {user.location.street}, {user.location.city}
      </div>
      <div>
        <img src={user.picture.thumbnail} alt="user-thumbnail" />
      </div>
      <div>
        <button className="button red" onClick={e => onDelete(e, user.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.shape({
      title: PropTypes.string,
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    location: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
    }),
    picture: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    email: PropTypes.string,
    gender: PropTypes.string,
    phone: PropTypes.string,
    login: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  onEditToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserListItem;
