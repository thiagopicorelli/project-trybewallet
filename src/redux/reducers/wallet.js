// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  expensesValue: 0,
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  nextId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const obj = action.payload;
  let exp = {};
  let exps = {};
  let val = 0;
  switch (action.type) {
  case 'SET_CURRENCIES':
    return { ...state, currencies: obj };
  case 'ADD_EXPENSES':
    return { ...state,
      expenses: [...state.expenses, obj],
      expensesValue:
        state.expensesValue + obj.value * +(obj.exchangeRates[obj.currency].ask),
      nextId: state.nextId + 1,
    };
  case 'DEL_EXPENSE':
    exp = state.expenses.find((expense) => expense.id === obj);
    val = exp.value * +(exp.exchangeRates[exp.currency].ask);
    if (state.expensesValue < val) {
      val = state.expensesValue;
    }
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== obj),
      expensesValue: state.expensesValue - val,
    };
  case 'SET_EDIT_MODE':
    return { ...state,
      editor: obj.editor,
      idToEdit: obj.id,
    };
  case 'EDIT_EXPENSE':
    exps = [...state.expenses];
    exp = exps.findIndex((expense) => expense.id === obj.id);
    exps[exp] = obj;
    for (let i = 0; i < exps.length; i += 1) {
      val += exps[i].value * +(exps[i].exchangeRates[exps[i].currency].ask);
    }
    return { ...state,
      editor: false,
      expenses: exps,
      expensesValue: val,
    };
  default:
    return state;
  }
};

export default wallet;
