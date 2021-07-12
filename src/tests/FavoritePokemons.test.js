import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('testes quando não há favoritos', () => {
  let getByText;
  let queryByTestId;
  let favoriteLink;

  beforeEach(
    () => {
      ({ getByText, queryByTestId } = renderWithRouter(<App />));
    },
  );

  beforeEach(() => {
    (favoriteLink = getByText(/favorite pokémons/i));
  });

  it('testa se a mensagem No Favorite pokemons found renderiza', () => {
    fireEvent.click(favoriteLink);

    const notFound = getByText(/No favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
  });

  it('testa se nenhum card é exibido', () => {
    fireEvent.click(favoriteLink);
    const cards = queryByTestId('pokemon-name');

    expect(cards).toBe(null);
  });
});

describe('testes quando há favoritos', () => {
  it('testa se os cards são renderizados na pagina', () => {
    const {
      getByLabelText,
      getByText,
      getAllByTestId,
      history,
    } = renderWithRouter(<App />, ['/pokemons/10']); // Caterpie

    fireEvent.click(getByLabelText('Pokémon favoritado?'));

    history.push('/pokemons/23'); // Ekans | history.push inspirado pelo código maravilhoso do @Inácio - T11
    fireEvent.click(getByLabelText('Pokémon favoritado?'));

    const favoritePageLink = getByText(/favorite pokémons/i);
    fireEvent.click(favoritePageLink);

    const cards = getAllByTestId('pokemon-name');
    expect(cards.length).toBe(2);
    expect(cards[0]).toContainHTML('Caterpie');
    expect(cards[1]).toContainHTML('Ekans');
  });
});
