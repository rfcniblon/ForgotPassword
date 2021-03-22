/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import { HeaderBar } from '../';

const title = {
  pageTitle: 'Création d un compte',
};

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      messageFromServer: '',
      showError: false,
      registerError: false,
      loginError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerUser = async (e) => {
    e.preventDefault();
    const { first_name, last_name, username, password, email } = this.state;
    if (username === '' || password === '' || email === '') {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true,
      });
    } else {
      try {
        const response = await axios.post(SERVER_ADDRESS +
          '/registerUser',
          {first_name, last_name, email, username, password, },
        );
        this.setState({
          messageFromServer: response.data.message,
          showError: false,
          loginError: false,
          registerError: false,
        });
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'pseudo ou email existe en base de donnée') {
          this.setState({
            showError: true,
            loginError: true,
            registerError: false,
          });
        }
      }
    }
  };

  // eslint-disable-next-line consistent-return
  render() {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      messageFromServer,
      showError,
      loginError,
      registerError,
    } = this.state;

    if (messageFromServer === '') {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.registerUser}>
            <input
              id="first_name"
              label="Nom"
              value={first_name}
              onChange={this.handleChange('first_name')}
              placeholder="Nom"
            />
            <input
              id="last_name"
              label="Prenom"
              value={last_name}
              onChange={this.handleChange('last_name')}
              placeholder="Prenom"
            />
            <input
              id="email"
              label="email"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Email"
            />
            <input
              id="username"
              label="Pseudo"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Pseudo"
            />
            <input
              id="password"
              label="Password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <button type="submit">S'inscrire</button>
          </form>
          {showError === true && registerError === true && (
            <div>
              <p>Le pseudo, password et email sont requis.</p>
            </div>
          )}
          {showError === true && loginError === true && (
            <div>
              <p>
                Le pseudo ou l'email sont deja présent dans la base. Veuillez en choisir un autre ou connecter vous..
              </p>
               <a href="/login">Connexion</a>
            </div>
          )}
          <a href="/">Accueil</a>
        </div>
      );
    }
    if (messageFromServer === 'user created') {
      return (
        <div>
          <HeaderBar title={title} />
          <h3>Création du compte réussi</h3>
          <a href="/login">Connexion</a>
        </div>
      );
    }
  }
}

export default Register;
