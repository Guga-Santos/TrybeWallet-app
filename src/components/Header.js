import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import wallet from '../images/wallet.png';
import word from '../images/word.png';

class Header extends Component {
  render() {
    const { userEmail, totalSum } = this.props;
    return (
      <div className="header-container">
        <div className="logo-header">
          <img className="walletIMG" src={ wallet } alt="wallet" />
          <img className="wordIMG" src={ word } alt="" />
        </div>
        <div className="right-container">
          <h3 data-testid="email-field">
            {' '}
            {userEmail}
          </h3>
          <div className="currency-container">
            <h3 data-testid="header-currency-field">BRL</h3>
            <h3 data-testid="total-field">
              { totalSum.length < 1
                ? 0
                : totalSum
                  .map((obj) => Number(obj.value)
                * Number(obj.exchangeRates[obj.currency].ask))
                  .reduce((a, b) => a + b)
                  .toFixed(2) }
            </h3>
          </div>
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
