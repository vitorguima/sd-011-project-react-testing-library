import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Testa se é exibido No favorite pokemon found, se não tiver favoritos.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritePoke = getByText(/Favorite pokémons/i);
  fireEvent.click(favoritePoke);
  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

test('Testa se são exibidos todos os cards de pokémons favoritados', () => {
  const { container } = render(
    <FavoritePokemons />,
  );
  const favorites = container.querySelectorAll('.favorite-pokemons');
  expect(favorites.length === 0).toBe(true);
});

test('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { container } = render(
    <FavoritePokemons />,
  );
  const favorites = container.querySelectorAll('.favorite-pokemon');
  expect(favorites.length === 0).toBe(true);
});
