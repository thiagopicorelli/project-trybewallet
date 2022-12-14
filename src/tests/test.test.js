import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('5 - Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  const walletPage = () => screen.getByTestId('wallet-page');

  it('Testa App', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    await act(() => {
      history.push('/carteira');
    });
    expect(walletPage()).toBeInTheDocument();
  });

  it('Testa Login', async () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByText('Entrar');
    expect(button).toHaveProperty('disabled', true);

    const EMAIL = 'email@email.com';
    const emailInput = screen.getByTestId('email-input');
    act(() => {
      fireEvent.change(emailInput, { target: { value: EMAIL } });
    });
    expect(emailInput).toHaveProperty('value', EMAIL);

    const PASS = 'aaaaaa';
    const passInput = screen.getByTestId('password-input');
    act(() => {
      fireEvent.change(passInput, { target: { value: PASS } });
    });
    expect(passInput).toHaveProperty('value', PASS);

    expect(button).toHaveProperty('disabled', false);
    await act(() => {
      fireEvent.click(button);
    });
    expect(walletPage()).toBeInTheDocument();
  });

  it('Testa Wallet', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    await act(() => {
      history.push('/carteira');
    });
    expect(walletPage()).toBeInTheDocument();

    const VALUE = '5';
    const valInput = screen.getByTestId('value-input');
    act(() => {
      fireEvent.change(valInput, { target: { value: VALUE } });
    });
    expect(valInput).toHaveProperty('value', VALUE);

    const button = screen.getByText('Adicionar despesa');
    await act(() => {
      fireEvent.click(button);
    });
    expect(screen.getByTestId('total-field')).toHaveTextContent('23.77');
  });
});
