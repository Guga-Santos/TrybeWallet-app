import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { popUp, updateExpenses } from '../actions';

const INITIAL_TAG = 'Alimentação';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: INITIAL_TAG,
    };
  }

  componentDidMount() {
    const { expenses, id } = this.props;
    const teste = [...expenses];

    const alter = teste[Number(id)];

    console.log(teste);

    this.setState({
      value: alter.value,
      description: alter.description,
      currency: alter.currency,
      method: alter.method,
      tag: alter.tag,
    });
  }

  handleClick = async (e) => {
    e.preventDefault();

    const { value,
      description,
      currency,
      method,
      tag } = this.state;

    const { expenses, id, popUpOff, update } = this.props;
    const teste = [...expenses];

    const alter = teste[Number(id)];
    alter.value = value;
    alter.description = description;
    alter.currency = currency;
    alter.method = method;
    alter.tag = tag;

    console.log(teste);

    popUpOff();
    update(teste);
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
            data-testid="currency-input"
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
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  popUpOff: () => dispatch(popUp()),
  update: (value) => dispatch(updateExpenses(value)),
});

Forms.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  popUpOff: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
