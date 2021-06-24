import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente App', () => {
  test('pág principal é renderizada ao carregar a aplicação no caminho de URL/', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });

  test('teste se existe o link home e sua funcionalidade', () => {
    const { getByRole, history: { location: { pathname } } } = renderWithRouter(<App />);

    const linkHome = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);
    expect(pathname).toBe('/');
  });

  test('teste se existe o link About e sua funcionalidade', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('teste se existe o link Pokémons Favoritados e sua funcionalidade', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkFavorite = getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(linkFavorite);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Teste a página Not Found ao entrar em uma URL desconhecida', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/route-not-exists/');

    const linkNotExist = getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(linkNotExist).toBeInTheDocument();
  });
});
