import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpenses, setIds } from '../actions';
import Forms from './Forms';

class Table extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

handleDeleteBtn = ({ target }) => {
  const { wallet, remove } = this.props;
  const filter = wallet.filter((obj) => obj.id !== Number(target.id));
  remove(filter);
}

handleEditBtn = ({ target }) => {
  const { setId } = this.props;
  setId(target.id);
}

render() {
  const { wallet, popUp } = this.props;
  return (
    <div>
      { popUp
        ? (
          <div className="popUp">
            <Forms />
          </div>
        )
        : (
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
                          onClick={ this.handleEditBtn }
                          id={ exp.id }
                          data-testid="edit-btn"
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
        )}
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  wallet: state.wallet.expenses,
  popUp: state.wallet.popUp,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (value) => dispatch(removeExpenses(value)),
  setId: (id) => dispatch(setIds(id)),
});

Table.propTypes = {
  wallet: PropTypes.arrayOf(Object).isRequired,
  remove: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  popUp: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
