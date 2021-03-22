/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { HeaderBar } from '../';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get(SERVER_ADDRESS + '/reset', {
        params: {
          resetPasswordToken: token,
        },
      });
      // console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(SERVER_ADDRESS +
        '/updatePasswordViaEmail',
        {
          username,
          password,
          resetPasswordToken: token,
        },
      );
      console.log(response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const {
 password, error, isLoading, updated 
} = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>
            <h4>Erreur pedant l'envoie d'email. veuillez r'envoyer un nouveau lien email.</h4>
            <a href="/">Accueil</a>
            <a href="/forgotPassword">Mot de pass perdu ?</a>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <HeaderBar title={title} />
        <form className="password-form" onSubmit={this.updatePassword}>
          <input
            id="password"
            label="password"
            onChange={this.handleChange('password')}
            value={password}
            type="password"
          />
         
          <button type="submit">Modifier password</button>
        </form>

        {updated && (
          <div>
            <p>
             Le password à bien été modifié avec succés, veuillez vous reconnecter.
            </p>
            <a href="/login">Connexion</a>
          </div>
        )}
      
    <a href="/">Accueil</a>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
