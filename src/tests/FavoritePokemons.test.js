import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Testa se é exibido a correta msg quando não existe Pokemon favorito', () => {
  const { container } = render(<FavoritePokemons />);
  expect(container.innerHTML).toMatch('No favorite pokemon found');
});

test('Testa se é exibido todos os cards de pokémons favoritado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const tipoBug = getByText(/Bug/i);

  fireEvent.click(tipoBug);
  const pokemon = container.querySelectorAll('p')[0].textContent;
  expect(container.innerHTML).toMatch(pokemon);
});
