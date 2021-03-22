/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { HeaderBar } from '../';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Modification profile utilisateur',
};

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      loadingUser: false,
      updated: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.setState({ loadingUser: true });

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
    const {
      match: {
        params: { username },
      },
    } = this.props;
    try {
      const response = await axios.get(SERVER_ADDRESS + '/findUser', {
        params: {
          username,
        },
        headers: { Authorization: `JWT ${accessString}` },
      });
      console.log(response.data);
      this.setState({
        loadingUser: false,
        first_name: response.data.first_name ? response.data.first_name : '',
        last_name: response.data.last_name ? response.data.last_name : '',
        email: response.data.email,
        username: response.data.username,
        password: response.data.password,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateUser = async (e) => {
    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
    const {
 first_name, last_name, email, username 
} = this.state;
    e.preventDefault();
    try {
      const response = await axios.put(SERVER_ADDRESS +
        '/updateUser',
        {
          first_name,
          last_name,
          email,
          username,
        },
        {
          headers: { Authorization: `JWT ${accessString}` },
        },
      );
      // eslint-disable-next-line no-unused-vars
      console.log(response.data);
      this.setState({
        updated: true,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        loadingUser: false,
        error: true,
      });
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
      updated,
      error,
      loadingUser,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <p style={loading}>
            Un probleme d'accés aux données. veuillez vous reconnecter.
          </p>
          <a href="/login">Connexion</a>
        </div>
      );
    }
    if (loadingUser !== false) {
      return (
        <div>
          <HeaderBar title={title} />
          <p style={loading}>Chargement données user...</p>
        </div>
      );
    }
    if (loadingUser === false && updated === true) {
      return <Redirect to={`/userProfile/${username}`} />;
    }
    if (loadingUser === false) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.updateUser}>
            <input
              id="first_name"
              label="Nom"
              value={first_name}
              onChange={this.handleChange('first_name')}
              placeholder="First Name"
            />
            <input
              id="last_name"
              label="Prenom"
              value={last_name}
              onChange={this.handleChange('last_name')}
              placeholder="Last Name"
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
              readOnly
              disabled
            />
            <input
              id="password"
              label="password"
              value={password}
              readOnly
              disabled
              type="password"
            />
           <button type="submit"> Sauvegarder </button>
          </form>
          <a href="/">Accueil</a>
           <a href={`/userProfile/${username}`}> Annuler </a>
        </div>
      );
    }
  }
}

UpdateProfile.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default UpdateProfile;
