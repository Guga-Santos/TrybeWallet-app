import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { string } from 'stylelint/lib/formatters';
import { addExpenses, getCurrencies } from '../actions';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expenses: [],
    };
  }

  componentDidMount() {
    const { getCur } = this.props;
    getCur();
  }

  handlefetch = async () => {
    const { addExpense } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      expenses } = this.state;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    // const results = Object.values(data);
    // const object = results.map((obj) => ({
    //   [obj.code]: obj,
    // }));

    const userExpenses = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    this.setState((prev) => ({
      expenses: [...prev.expenses, userExpenses],
    }));

    addExpense(userExpenses);
  }

  handleClick = async (e) => {
    e.preventDefault();
    await this.handlefetch();

    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      isDisable,
    } = this.state;
    return (
      <div>
        <Header />
        <div className="form-container">
          <label htmlFor="input-valor">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((str) => (
                <option value={ str } key={ Math.random() }>
                  {str}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <select
              id="method"
              onChange={ this.handleChange }
              value={ method }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isDisable }
          >
            Adicionar despesa
          </button>
          <Table />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCur: () => dispatch(getCurrencies()),
  addExpense: (value) => dispatch(addExpenses(value)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  getCur: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(string).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
