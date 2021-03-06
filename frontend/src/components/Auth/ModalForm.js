import React from 'react';

export default class ModalForm extends React.Component {
  render() {
    if (!window.localStorage.sessionToken) {
      return (
        <div id="signup-modal" className="modal">
          <div className="modal-content">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" className="validate" />
                  <label for="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" />
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input id="email" type="text" className="validate" />
                  <label for="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input id="username" type="text" className="validate" />
                  <label for="username">Username</label>
                </div>
                <div className="input-field col s6">
                  <input id="password" type="password" className="validate" />
                  <label for="password">Password</label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn waves-effect waves-light">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="login-modal" className="modal">
          <div className="modal-content">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input id="username" type="text" className="validate" />
                  <label for="username">Username</label>
                </div>
                <div className="input-field col s6">
                  <input id="password" type="password" className="validate" />
                  <label for="password">Password</label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn waves-effect waves-light">Log In
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      );
    }
  }
}
