import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App tests', () => {
  test('Testa se a página renderiza no "/"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Deve haver três links, Home, About e Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('Home muda para "/" ao ser clicado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('About muda para "/about" ao ser clicado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Favorite Pokémons muda para "/favorites" ao ser clicado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');

    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa se a redireciona para "Not Found"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('not-found');

    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
