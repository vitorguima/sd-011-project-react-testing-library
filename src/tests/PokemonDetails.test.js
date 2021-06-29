import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('', () => {
  const MEW_ID = 151;
  const onUpdateFavoritePokemons = jest.fn();
  const { click } = fireEvent;

  function build(id, favorite) {
    return render(
      <PokemonDetails
        match={ { params: { id: id.toString() } } }
        isPokemonFavoriteById={ { [id]: favorite } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
      />,
    );
  }

  test(`Checks if the selected Pokémon's detailed information 
  is shown on the screen.`, () => {
    build(MEW_ID, false);

    screen.getByText('Mew Details');

    const linkMoreDetails = screen.queryByText('More details');
    expect(linkMoreDetails).toBeNull();

    const headingH2 = screen.getByText('Summary');
    expect(headingH2.tagName).toBe('H2');

    const paragraphOfThePokemonSummary = screen.getByText(pokemons[5].summary);
    expect(paragraphOfThePokemonSummary.tagName).toBe('P');
  });

  test(`Check if there is a section on the page with maps containing 
  the locations of the pokemon`, () => {
    build(MEW_ID);

    const headingH2 = screen.getByText('Game Locations of Mew');
    expect(headingH2.tagName).toBe('H2');

    const pokemonLocationImage = screen.getAllByAltText('Mew location');
    expect(pokemonLocationImage.length).toBe(pokemons[5].foundAt.length);

    pokemonLocationImage.forEach((image, index) => {
      expect(image.getAttribute('src')).toBe(pokemons[5].foundAt[index].map);
      expect(image.nextSibling.textContent).toBe(pokemons[5].foundAt[index].location);
    });
  });

  test('Checks if the user can bookmark a pokemon through the details page.', () => {
    const { unmount } = build(MEW_ID, false);

    const favoritePokemonCheckboxLabel = screen.getByText('Pokémon favoritado?');
    const favoritePokemonCheckboxInput = favoritePokemonCheckboxLabel.querySelector('input');

    expect(onUpdateFavoritePokemons).toBeCalledTimes(0);

    click(favoritePokemonCheckboxInput);

    expect(onUpdateFavoritePokemons).toBeCalledTimes(1);
    expect(onUpdateFavoritePokemons).toBeCalledWith(pokemons[5].id, true);

    unmount();
    onUpdateFavoritePokemons.mockClear();

    build(MEW_ID, true);

    expect(onUpdateFavoritePokemons).toBeCalledTimes(0);

    click(screen.getByText('Pokémon favoritado?').querySelector('input'));

    expect(onUpdateFavoritePokemons).toBeCalledTimes(1);
    expect(onUpdateFavoritePokemons).toBeCalledWith(pokemons[5].id, false);
  });
});
