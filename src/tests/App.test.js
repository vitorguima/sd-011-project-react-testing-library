import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/home');
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
    expect(home).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = getByText(/About/);
    expect(about).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About/);
    expect(aboutAll).toBeInTheDocument();
    expect(textFavoritePokemons).toBeInTheDocument();
  });

  test('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/Not Found/');
    const noMatch = getByText(/Página não encontrada/i);
    expect(noMatch).toBeInTheDocument();
  });
});
