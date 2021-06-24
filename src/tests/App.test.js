import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Se o topo da aplicação contém links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHome = getByText(/Home/i);
  expect(linkHome).toBeInTheDocument();
  const linkAbout = getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
  const linkFavoritePokemon = getByText(/Favorite Pokémons/i);
  expect(linkFavoritePokemon).toBeInTheDocument();
});
