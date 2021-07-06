import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes do componente "FavoritePokemons"', () => {
  describe('Testes quando não possui pokemons favoritados', () => {
    it('Testa se é exibido na tela "No favorite pokemon found", se não tiver favoritos',
      () => {
        const { getByText } = renderWithRouter(<FavoritePokemons />);
        const paragraph = getByText(/No favorite pokemon found/i);
        expect(paragraph).toBeInTheDocument();
      });
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const pokemon = [
      { buttonPosition: 0 },
      { buttonPosition: 2 },
    ];

    const {
      getAllByTestId,
      getByText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);

    const favoritePokemon = ({ buttonPosition }) => {
      const button = getAllByTestId(/pokemon-type-button/i)[buttonPosition];
      expect(button).toBeInTheDocument();
      userEvent.click(button);

      const showDetailsLink = getByText(/More details/i);
      expect(showDetailsLink).toBeInTheDocument();
      userEvent.click(showDetailsLink);

      const checkFavorite = getByLabelText(/Pokémon favoritado?/i);
      expect(checkFavorite).toBeInTheDocument();
      userEvent.click(checkFavorite);
      expect(checkFavorite).toBeChecked();
    };

    favoritePokemon(pokemon[0]);

    history.push('/');
    expect(history.location.pathname).toBe('/');

    favoritePokemon(pokemon[1]);

    history.push('/favorite');
    expect(history.location.pathname).toBe('/favorite');
  });
});
