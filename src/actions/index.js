export const USER_LOGIN = 'USER_LOGIN';
export const ADD_TO_WALLET = 'ADD_TO_WALLET';
export const ADD_EXPENSES = 'ADD_EXPENSES';

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
