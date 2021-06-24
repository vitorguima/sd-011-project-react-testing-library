import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Testa se o texto aparece na tela...', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/Favorite Pokémons/i);
    fireEvent.click(link); // Simula um clique e checa, pra ver se existe ou não o texto na tela, quando não há pokemons favoritos.
    const notFoundText = getByText(/No favorite pokemon found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste o componente <FavoritePokemons.js /> renderiza com favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const caterpie = getByText('Bug');
    fireEvent.click(caterpie);
    const detailLink = getByText(/More Details/i);
    fireEvent.click(detailLink);
    const checkBox = getByRole('checkbox');
    fireEvent.click(checkBox);
    expect(getByText('Caterpie')).toBeInTheDocument();
  });
});
