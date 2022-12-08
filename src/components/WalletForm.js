import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletActionCreator } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies();
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

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <div>
          <span>Despesa: </span>
          <input
            data-testid="value-input"
          />
        </div>
        <div>
          <span>Descrição: </span>
          <textarea
            data-testid="description-input"
          />
        </div>
        <div>
          <span>Moeda: </span>
          <select
            name="currency"
            data-testid="currency-input"
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
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
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
