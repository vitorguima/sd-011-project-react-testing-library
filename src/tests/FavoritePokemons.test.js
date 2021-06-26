import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favorites = getByText('No favorite pokemon found');
    expect(favorites).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /More Details/i,
    });
    fireEvent.click(moreDetails);
    const url1 = history.location.pathname;
    expect(url1).toBe('/pokemons/25');

    // const checkbox = getByRole('checkbox');
    // expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox);
    // expect(checkbox).toBeChecked();

    // const favorite = getByRole('link', {
    //   name: /Favorite Pokémons/i,
    // });
    // fireEvent.click(favorite);
    // const url2 = history.location.pathname;
    // expect(url2).toBe('/favorites');
    // const peso = 'Average weight';
    // expect(peso).toBeInTheDocument('Average weight');
  });
});
