import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
  const { getByText } = renderWithRouter(<App />);
  const favorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(favorite);
  const title = getByText(/No favorite pokemon found/i);
  expect(title).toBeInTheDocument();
});

it('Verificar se favorito renderiza', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText('More details');
  fireEvent.click(details);
  const inputFavorite = container.querySelector('#favorite');
  fireEvent.click(inputFavorite);
  const linkFavorite = getByText('Favorite Pokémons');
  fireEvent.click(linkFavorite);
  expect(getByText('Pikachu')).toBeInTheDocument();
});
