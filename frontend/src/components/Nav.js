import React from 'react';

import ModalForm from './auth/ModalForm';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      formType: ''
    };
  }

  renderLinks() {
    if (!window.localStorage.sessionToken) {
      return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <button data-target="modal1" class="btn modal-trigger">Sign Up</button>
          </li>
          <li>
            <button data-target="login-modal" class="btn modal-trigger">Log In</button>
          </li>
        </ul>
      );
    } else {
      return(
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="sass.html">Search</a></li>
          <li><a href="badges.html">Profile</a></li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Kollaperate</a>
            {this.renderLinks()}
          </div>
        </nav>
        <ModalForm />
      </div>
    );
  }
}
