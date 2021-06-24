import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// it('', () => {});
it('Testa se exibe `No favorite pokemon found`, se não tiver favoritados', () => {
  const { getByText } = renderWithRouter(<App />);
  const favorite = getByText(/Favorite Pokémons/);
  fireEvent.click(favorite);
  const notFound = getByText(/No favorite pokemon found/);
  expect(notFound).toBeInTheDocument();
});

it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { getByText, getByLabelText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const favorite = getByLabelText(/Pokémon favoritado?/);
  fireEvent.click(favorite);
  const linkFav = getByText('Favorite Pokémons');
  fireEvent.click(linkFav);
  const pokemon = getByText(/Pikachu/);
  expect(pokemon).toBeInTheDocument();
});
