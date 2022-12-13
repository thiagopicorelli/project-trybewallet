import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expensesValue } = this.props;
    const currency = 'BRL';
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ expensesValue.toFixed(2) }</span>
        <span data-testid="header-currency-field">{ currency }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesValue: state.wallet.expensesValue,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expensesValue: PropTypes.number.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
