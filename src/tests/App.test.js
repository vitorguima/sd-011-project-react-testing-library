import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe(' Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
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
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const textHome = getByRole('link', {
      name: /Home/i,
    });
    expect(textHome).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto About', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const textAbout = getByRole('link', {
      name: /About/i,
    });
    expect(textAbout).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const textFavoritePokemons = getByRole('link', {
      name: /Favorites/i,
    });
    expect(textFavoritePokemons).toBeInTheDocument();
  });
});
