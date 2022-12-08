import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActionCreator } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
      passIsValid: false,
      emailIsValid: false,
      isValid: false,
    };
  }

  onChangeEmail = ({ target }) => {
    const emailIsValid = target.validity.valid && target.value.length > 0;
    this.setState((prevState) => ({
      ...prevState,
      email: target.value,
      emailIsValid,
      isValid: emailIsValid && prevState.passIsValid,
    }));
  };

  onChangePass = ({ target: { value } }) => {
    const MIN_PASS_LEN = 6;
    const passIsValid = value.length >= MIN_PASS_LEN;
    this.setState((prevState) => ({
      ...prevState,
      pass: value,
      passIsValid,
      isValid: prevState.emailIsValid && passIsValid,
    }));
  };

  saveAccount = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;

    dispatch(userActionCreator({ email }));

    history.push('/carteira');
  };

  render() {
    const { email, pass, isValid } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <div>
          <span>Email: </span>
          <input
            value={ email }
            onChange={ this.onChangeEmail }
            type="email"
            data-testid="email-input"
          />
        </div>
        <div>
          <span>Senha: </span>
          <input
            value={ pass }
            onChange={ this.onChangePass }
            type="password"
            data-testid="password-input"
          />
        </div>
        <br />
        <button
          onClick={ this.saveAccount }
          disabled={ !isValid }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
