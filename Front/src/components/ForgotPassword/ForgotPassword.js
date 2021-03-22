import React, { Component } from 'react';
import axios from 'axios';
import { HeaderBar } from '..';

const title = {
    pageTitle: 'Petre de password',
  };

  const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

  class ForgotPassword extends Component {
    constructor() {
      super();
      this.state = {
        email: '',
        showError: false,
        messageFromServer: '',
        showNullError: false,
      };
    }
  
    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  
    sendEmail = async (e) => {
      e.preventDefault();
      const { email } = this.state;
      if (email === '') {
        this.setState({
          showError: false,
          messageFromServer: '',
          showNullError: true,
        });
      } else {
        try {
          const response = await axios.post(SERVER_ADDRESS +
            '/forgotPassword',
            { email, },
          );
          console.log(response.data);
          if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
        } catch (error) {
          console.error(error.response.data);
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
              showNullError: false,
            });
          }
        }
      }
    };
  
    render() {
      const {
   email, messageFromServer, showNullError, showError 
  } = this.state;
  
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.sendEmail}>
            <input
              id="email"
              label="email"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Adresse email"
            />
            <button type="submit">Envoi</button>
          </form>
          {showNullError && (
            <div>
              <p>L'adresse email ne peux pas être vide.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                L'adresse email est inconnu. veuillez reéssayer ou
                créer un nouveau compte.
              </p>
          
              <a href="/register">S'inscrire</a>
            </div>
          )}
          {messageFromServer === 'recovery email sent' && (
            <div>
              <h3>Email contenant le lien pour re-initialisé le password à reussi</h3>
            </div>
          )}
      <a href="/">Accueil</a>
        </div>
      );
    }
  }
  
  export default ForgotPassword;
