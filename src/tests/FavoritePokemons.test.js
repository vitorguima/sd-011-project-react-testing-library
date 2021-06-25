import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

// ideia tirada do codigo https://github.com/tryber/sd-011-project-react-testing-library/pull/76/files da Gisele Costa

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(
    'Teste se é exibido na tela a mensagem No favorite '
      + 'pokemon found, se a pessoa não tiver pokémons favoritos',
    () => {
      const { getByText } = renderWithRouter(<App />);
      fireEvent.click(getByText('Favorite Pokémons'));
      const pokemonNoFound = getByText('No favorite pokemon found');
      expect(pokemonNoFound).toBeInTheDocument();
    },
  );
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
