import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
handleDeleteBtn = ({ target }) => {
  const { wallet } = this.props;
  const filter = wallet.filter((obj, index) => obj[index] !== target.id);
  console.log(target.id);
  console.log(wallet);
  console.log(filter);
}

render() {
  const { wallet } = this.props;
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          wallet.length < 1
            ? null
            : wallet.map((exp) => (
              <tr key={ exp.id }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{Number(exp.value).toFixed(2)}</td>
                <td>{ (exp.exchangeRates[exp.currency].name) }</td>
                <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  { Number(exp.exchangeRates[exp.currency]
                    .ask * exp.value).toFixed(2)}

                </td>
                <td> Real </td>
                <td>
                  <button
                    type="button"
                  >
                    Editar

                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.handleDeleteBtn }
                    id={ exp.id }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}
}

const mapStateToProps = (state) => ({
  wallet: state.wallet.expenses,
});

Table.propTypes = {
  wallet: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
