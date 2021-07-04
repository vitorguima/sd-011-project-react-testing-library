import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('testa se aparece: No favorite pokemon found', () => {
  const { getByText } = render(<FavoritePokemons />);
  const texto = getByText(/No favorite pokemon found/i);
  expect(texto).toBeInTheDocument();
});

test('testa se tem card em favoritos', () => {
  const { getByText, getByRole, history, container } = renderWithRouter(<App />);
  const MoreDetails = getByText(/More details/i);
  fireEvent.click(MoreDetails);
  const checked = getByRole('checkbox');
  // console.log(checked);
  fireEvent.click(checked);
  history.push('/favorites');
  const div = container.querySelectorAll('.pokemon');
  // console.log(div.length);
  expect(div.length).toBe(1);
});

test('testa se não tem nenhem favorito', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);
  const div = container.querySelectorAll('.pokemon');
  // console.log(div.length);
  expect(div.length).toBe(0);
});
