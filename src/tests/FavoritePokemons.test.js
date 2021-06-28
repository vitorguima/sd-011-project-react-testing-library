import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithHistory from './aux/renderWithHistory';
import sleep from './aux/sleep';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Quando não há pokémon favoritado:', () => {
  let getByText;
  let queryByTestId;

  beforeEach(() => {
    ({ getByText, queryByTestId } = renderWithHistory(<FavoritePokemons />));
  });

  it('mostra texto indicando que não há pokémon favoritado.', () => {
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('NÃO mostra cards de pokémons', () => {
    expect(queryByTestId('pokemon-name')).not.toBeInTheDocument();
  });
});

describe('Quando há pokémons favoritados:', () => {
  it('mostra todos na tela de favoritos', async () => {
    const NAVIGATION_DELAY = 50;

    const {
      getByLabelText,
      history,
      getByText,
      getByAltText } = renderWithHistory(<App />);

    history.push('/pokemons/25');
    await sleep(NAVIGATION_DELAY);

    fireEvent.click(getByLabelText('Pokémon favoritado?'));

    history.push('/pokemons/4');
    await sleep(NAVIGATION_DELAY);

    fireEvent.click(getByLabelText('Pokémon favoritado?'));

    fireEvent.click(getByText('Favorite Pokémons'));
    await sleep(NAVIGATION_DELAY);

    expect(getByAltText('Charmander is marked as favorite')).toBeInTheDocument();
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
