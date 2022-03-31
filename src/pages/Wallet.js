import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import Header from '../components/Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCur } = this.props;
    getCur();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCur: () => dispatch(getCurrencies()),
});

Wallet.propTypes = {
  getCur: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
