// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSES,
  ADD_TO_WALLET, POP_UP, REMOVE_EXPENSES,
  SET_ID,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  popUp: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TO_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  case SET_ID:
    return {
      ...state,
      id: action.payload,
      popUp: true,
    };
  case POP_UP:
    return {
      ...state,
      popUp: false,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: action.update,
    };
  default:
    return state;
  }
};

export default wallet;
