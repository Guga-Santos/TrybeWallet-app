import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <h1>TRYBEWALLET</h1>
        <h3 data-testid="email-field">
          {' '}
          {userEmail}
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
        <h3 data-testid="total-field">0</h3>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
