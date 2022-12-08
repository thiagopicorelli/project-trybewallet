// Coloque aqui suas actions
export const userActionCreator = (account) => ({
  type: 'SET_ACCOUNT',
  payload: account,
});

export const walletActionCreator = (type, wallet) => ({
  type,
  payload: wallet,
});
