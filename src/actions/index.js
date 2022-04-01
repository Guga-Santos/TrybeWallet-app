export const USER_LOGIN = 'USER_LOGIN';
export const ADD_TO_WALLET = 'ADD_TO_WALLET';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const SET_ID = 'SET_ID';
export const POP_UP = 'POP_UP';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const getEmail = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const addToWallet = (currencies) => ({
  type: ADD_TO_WALLET,
  payload: currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const removeExpenses = (expenses) => ({
  type: REMOVE_EXPENSES,
  payload: expenses,
});

export const setIds = (id) => ({
  type: SET_ID,
  payload: id,
});

export const popUp = () => ({
  type: POP_UP,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  update: expenses,
});

export function getCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const result = Object.keys(data).filter((obj) => obj !== 'USDT');
      return dispatch(addToWallet(result));
    } catch (error) {
      return Error(error);
    }
  };
}
