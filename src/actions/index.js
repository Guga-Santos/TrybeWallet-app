// Coloque aqui suas actions

export const USER_LOGIN = 'USER_LOGIN';

export const getEmail = (email) => ({
  type: USER_LOGIN,
  payload: email,
});
