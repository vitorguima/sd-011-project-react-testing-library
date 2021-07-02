import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('if there are three links in page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkHome = getByText('Home');
  const linkAbout = getByText('About');
  const linkFavoritePokemons = getByText('Favorite Pokémons');

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavoritePokemons).toBeInTheDocument();
});
