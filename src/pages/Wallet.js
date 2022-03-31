import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { string } from 'stylelint/lib/formatters';
import { getCurrencies } from '../actions';
import Header from '../components/Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCur } = this.props;
    getCur();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <div className="form-container">
          <label htmlFor="input-valor">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="input-valor"
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="input-description"
            />
          </label>
          <label htmlFor="select-currencies">
            Moeda:
            <select id="select-currencies">
              {currencies.map((str) => (
                <option value={ str } key={ Math.random() }>
                  {str}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method" data-testid="method-input">
            Forma de pagamento:
            <select id="method">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCur: () => dispatch(getCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  getCur: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
