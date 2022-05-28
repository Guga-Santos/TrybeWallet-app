import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEmail } from '../actions';
import Loader from '../components/Loader';
import image01 from '../images/image01.svg';
import wallet from '../images/wallet.png';
import word from '../images/word.png';

const TIMEOUT = 2000;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      email: '',
      password: '',
      redirect: false,
      loader: false,
    };
  }

  handleChange = ({ target }) => {
    const emailVerify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_LENGTH = 5;

    const { email, password } = this.state;

    this.setState((before) => ({
      email: target.id === 'input-email' ? target.value : before.email,
      password: target.id === 'input-password' ? target.value : before.password,
    }), () => this.setState({
      disabled: !emailVerify.test(email) || password.length < MIN_LENGTH,
    }));
  }

  handleClick = () => {
    const { setEmail } = this.props;
    const { email } = this.state;

    this.setState({
      loader: true,
    });

    setTimeout(() => {
      this.setState({
        loader: false,
        redirect: true,
      });
    }, TIMEOUT);

    setEmail(email);
  }

  render() {
    const { disabled, email, password, redirect, loader } = this.state;

    return (
      loader ? <Loader />
        : <div className="big-container">
          <div className="msg-container">
            <div className="logo-container">
              <img src={ wallet } alt="wallet" />
              <img id="word-logo" src={ word } alt="word" />
            </div>
            <h4 className="phrase">Planeje e gerencia ativamente os seus gastos!</h4>
            <img src={ image01 } alt="imagem" />
          </div>
          <div className="login-container">
            <h1>LOGIN</h1>
            <label htmlFor="input-email">
              Email:
              <input
                type="email"
                data-testid="email-input"
                id="input-email"
                onChange={ this.handleChange }
                value={ email }
              />
            </label>
            <label htmlFor="input-password">
              Senha:
              <input
                type="password"
                data-testid="password-input"
                id="input-password"
                onChange={ this.handleChange }
                value={ password }
              />
            </label>
            <button
              type="submit"
              id="login-btn"
              disabled={ disabled }
              onClick={ this.handleClick }
              className={ disabled ? '' : 'loginBtn' }
            >
              Entrar
            </button>
            {redirect && <Redirect push to="/carteira" />}
          </div>

        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
