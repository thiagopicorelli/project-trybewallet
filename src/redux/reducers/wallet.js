// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  expensesValue: 0,
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  const obj = action.payload;
  switch (action.type) {
  case 'SET_CURRENCIES':
    return { ...state, currencies: obj };
  case 'ADD_EXPENSES':
    obj.id = state.expenses.length;
    return { ...state,
      expenses: [...state.expenses, obj],
      expensesValue:
        state.expensesValue + obj.value * +(obj.exchangeRates[obj.currency].ask),
    };
  default:
    return state;
  }
};

export default wallet;
