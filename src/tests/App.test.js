import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente App.js', () => {
  it('Página principal é redenrizada na url / ', () => {
    const { getByText } = renderWithRouter(<App />);
    const subtitle = getByText(/Encountered pokémons/);
    expect(subtitle).toBeInTheDocument();
  });

  it('Topo da página contém 3 links fixos de navegação', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0]).toBeInTheDocument();
    expect(links[1]).toBeInTheDocument();
    expect(links[2]).toBeInTheDocument();
  });

  it('Redireciona para a URL / ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/));
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Redireciona para a URL /about ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/));
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  it('Redireciona para a URL /favorites ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/));
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });

  it('Renderiza NotFound', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const erroPage = 'silas';
    history.push(erroPage);
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});

// Acessar os elementos da tela
// Interagir com eles (se houver necessidade)
// Fazer teste
