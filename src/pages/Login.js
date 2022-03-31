import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      email: '',
      password: '',
      redirect: false,
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
      redirect: true,
    });
    setEmail(email);
  }

  render() {
    const { disabled, email, password, redirect } = this.state;

    return (
      <div>
        <h1>Login</h1>
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
        >
          Entrar
        </button>
        { redirect && <Redirect push to="/carteira" /> }
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
