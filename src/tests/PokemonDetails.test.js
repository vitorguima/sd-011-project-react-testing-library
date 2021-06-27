import React from 'react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import PokemonDetails from '../components/PokemonDetails';

describe('test the component PokemonDetails', () => {
  const urlId = '/pokemons/:id';
  const urlNumber = '/pokemons/25';
  it('tests if informations about the pokemons selected will be show', () => {
    const { getByText, queryByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: false } }
        match={ {
          isExact: true,
          params: { id: '25' },
          path: urlId,
          url: urlNumber,
        } }
      />,
    );
    const pikachu = pokemons[0];
    expect(getByText(`${pikachu.name} Details`)).toBeInTheDocument();
    expect(queryByText('More details')).not.toBeInTheDocument();
    expect(document.getElementsByTagName('h2')[1].innerHTML).toBe('Summary');
    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  it('tests if exists a map showing where can be found the pokemons', () => {
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: false } }
        match={ {
          isExact: true,
          params: { id: '25' },
          path: urlId,
          url: urlNumber,
        } }
      />,
    );

    // eslint-disable-next-line max-len
    expect(document.getElementsByTagName('h2')[2].innerHTML)
      .toBe(`Game Locations of ${pokemons[0].name}`);
    (pokemons[0].foundAt).forEach(({ location, map }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(getAllByAltText(`${pokemons[0].name} location`)[index].src).toBe(map);
    });
  });

  it('tests if user can check the favorite checkbox', () => {
    const { getByLabelText, queryByAltText, getByRole } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: false } }
        match={ {
          isExact: true,
          params: { id: '25' },
          path: urlId,
          url: urlNumber,
        } }
      />,
    );
    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    const star = queryByAltText('Pikachu is marked as favorite');
    expect(star).toBeNull();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
