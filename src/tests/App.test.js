import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente App.js', () => {
  test('Teste se a página principal da Pokédex é renderizada na URL /', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeDefined();
  });

  test('O topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoriteLink).toBeDefined();
  });

  test('App é redirecionado para a página inicial, na URL ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    userEvent.click(homeLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  test('App é redirecionado a URL/about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  test('App é redirecionado a URL/favorites ao clicar no link Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoriteLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });
  test('App é redirecionado pra Not Found caso a URL não exista', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/404');

    const imageError = screen.getByText(/Page requested not found/i);

    expect(imageError).toBeDefined();
  });
});
