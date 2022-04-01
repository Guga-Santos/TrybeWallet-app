import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, totalSum } = this.props;
    return (
      <div className="header-container">
        <h1>TRYBEWALLET</h1>
        <h3 data-testid="email-field">
          {' '}
          {userEmail}
        </h3>
        <div className="currency-container">
          <h3 data-testid="header-currency-field">BRL</h3>
          <h3 data-testid="total-field">
            { totalSum.length < 1
              ? 0
              : totalSum.map((obj) => Number(obj.value)).reduce((a, b) => a + b) }
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSum: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalSum: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
