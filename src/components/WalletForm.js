import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletActionCreator } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies();
    this.state = {
      description: '',
      value: 0,
      currency: 'BRL',
      payment: 'dinheiro',
      tag: 'Alimentação',
    };
  }

  fetchCurrencies = async () => {
    const { dispatch, currencies } = this.props;
    if (currencies.length !== 0) {
      return;
    }

    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((money) => {
        const moneys = Object.keys(money).filter((val) => val !== 'USDT');
        dispatch(walletActionCreator('SET_CURRENCIES', moneys));
      });
  };

  adicionarDespesa = async () => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        //dispatch(walletActionCreator('SET_EXPENSES', currencies));
        console.log(currencies);
      });
  };

  onInputChange = ({ target }) => {
    const name = target.getAttribute('name');

    this.setState((prevState) => ({
      ...prevState,
      [name]: target.value,
    }));
  };

  render() {
    const {
      description,
      value,
      currency,
      payment,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <div>
          <span>Descrição: </span>
          <textarea
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.onInputChange }
          />
        </div>
        <div>
          <span>Despesa: </span>
          <input
            name="value"
            type="number"
            data-testid="value-input"
            value={ value }
            onChange={ this.onInputChange }
          />
        </div>
        <div>
          <span>Moeda: </span>
          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.onInputChange }
          >
            { currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{ coin }</option>
            )) }
          </select>
        </div>
        <div>
          <span>Pagamento: </span>
          <select
            name="payment"
            data-testid="method-input"
            value={ payment }
            onChange={ this.onInputChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </div>
        <div>
          <span>Categoria: </span>
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button
          type="button"
          onClick={ this.adicionarDespesa }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
