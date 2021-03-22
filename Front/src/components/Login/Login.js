/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { HeaderBar } from '../';

const title = {
  pageTitle: 'Connexion',
};

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
      });
    } else {
      try {
        const response = await axios.post(SERVER_ADDRESS+'/loginUser', {
          username,
          password,
        });
        localStorage.setItem('JWT', response.data.token);
        this.setState({
          loggedIn: true,
          showError: false,
          showNullError: false,
        });
      } catch (error) {
        console.error(error.response.data);
        if (
          error.response.data === 'mauvais pseudo'
          || error.response.data === 'mauvais passwords'
        ) {
          this.setState({
            showError: true,
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const {
      username,
      password,
      showError,
      loggedIn,
      showNullError,
    } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
            <input
              id="username"
              label="Pseudo"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Pseudo"
            />

            <input
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <button type="submit">Connexion</button>
          </form>
          {showNullError && (
            <div>
              <p>Le pseudo ou le password est obligatoire.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                Pseudo ou mot de pass introuvable .Réessayer ou créer un compte.
              </p>
              <a href="/register">S'inscrire</a>  
            </div>
          )}
          <a href="/">Accueil</a>
          <a href="/forgotpassword">Password perdu ?</a>
        </div>
      );
    }
    return <Redirect to={`/userProfile/${username}`} />;
  }
}

export default Login;
