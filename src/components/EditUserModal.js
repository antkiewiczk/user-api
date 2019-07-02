import React, { Component } from "react";
import PropTypes from "prop-types";

class EditUserModal extends Component {
  state = {
    user: {}
  };

  componentWillMount = () => {
    this.setState({
      user: this.props.editingUser
    });
  };

  onChange = e => {
    const { user } = this.state;
    const { name, value } = e.target;

    const updatedUser = {
      ...user
    };
    // user object is not flat hence this structure
    if (name === "title" || name === "first" || name === "last") {
      updatedUser.name[name] = value;
    } else if (name === "street" || name === "city" || name === "state") {
      updatedUser.location[name] = value;
    } else {
      updatedUser[name] = value;
    }

    this.setState({
      user: updatedUser
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.state;
    this.props.onFormSubmit(user);
  };

  render() {
    const { display, onModalToggle } = this.props;
    const { user } = this.state;

    if (!display) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-inner">
          <form className="form" onSubmit={this.onSubmit}>
            <div className="inner">
              <label htmlFor="title">Title</label>
              <input
                name="title"
                value={user.name.title}
                onChange={this.onChange}
              />

              <label htmlFor="first">First name</label>
              <input
                name="first"
                value={user.name.first}
                onChange={this.onChange}
              />

              <label htmlFor="last">Last name</label>
              <input
                name="last"
                value={user.name.last}
                onChange={this.onChange}
              />

              <label htmlFor="email">Email</label>
              <input name="email" value={user.email} onChange={this.onChange} />

              <label htmlFor="phone">Phone</label>
              <input name="phone" value={user.phone} onChange={this.onChange} />

              <label htmlFor="cell">Cell</label>
              <input name="cell" value={user.cell} onChange={this.onChange} />

              <label htmlFor="street">Street</label>
              <input
                name="street"
                value={user.location.street}
                onChange={this.onChange}
              />

              <label htmlFor="city">City</label>
              <input
                name="city"
                value={user.location.city}
                onChange={this.onChange}
              />

              <label htmlFor="state">State</label>
              <input
                name="state"
                value={user.location.state}
                onChange={this.onChange}
              />

              <button type="submit" className="button">
                Update user
              </button>
            </div>
          </form>

          <button className="modal-close" onClick={onModalToggle}>
            X
          </button>
        </div>
      </div>
    );
  }
}

EditUserModal.propTypes = {
  display: PropTypes.bool.isRequired,
  editingUser: PropTypes.shape({}).isRequired,
  onModalToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default EditUserModal;
