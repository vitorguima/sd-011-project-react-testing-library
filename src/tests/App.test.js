import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    render(<App />);
    const textHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(textHome).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto About', () => {
    render(<App />);
    const textAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(textAbout).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Favorite Pokémons', () => {
    render(<App />);
    const textFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(textFavoritePokemons).toBeInTheDocument();
  });
});
