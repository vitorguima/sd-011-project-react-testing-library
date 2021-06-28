import React from 'react';
import { screen } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import { renderWithRouter } from '../helpers';
import pokemons from '../data';
import { isPokemonFavoriteById } from '../mockedFavoritePokemons';

const pokemon = pokemons[1];
const {
  id: pokemonID,
  name: pokemonName,
  summary: pokemonSummary,
  foundAt: pokemonLocations,
} = pokemon;

describe('PokemonDetails.js:', () => {
  beforeEach(() => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ {
          params: {
            id: pokemonID.toString(),
          },
        } }
        onUpdateFavoritePokemons={ jest.fn() }
        pokemons={ pokemons }
      />,
    );
  });

  it('The page must contain detailed information about a given pokemon.', () => {
    const pageHeading = screen.getByRole('heading', {
      name: new RegExp(`${pokemonName} details`, 'i'),
    });
    const detailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const summaryParagraph = screen.getByText(
      new RegExp(pokemonSummary, 'i'),
    );

    expect(pageHeading).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });

  it('The page must contain a section with maps indicating '
    + 'the pokemon\'s location.', () => {
    const locationHeading = screen.getByRole('heading', {
      name: new RegExp(`game locations of ${pokemonName}`, 'i'),
    });

    expect(locationHeading).toBeInTheDocument();
    pokemonLocations.forEach(({ location, map }, index) => {
      const locationImageAlt = `${pokemonName} location`;
      const renderedLocationName = screen.getByText(location);
      const renderedLocationImage = screen.getAllByRole('img', {
        name: new RegExp(locationImageAlt),
      })[index];

      expect(renderedLocationName).toBeInTheDocument();
      expect(renderedLocationImage).toBeInTheDocument();
      expect(renderedLocationImage.alt).toBe(locationImageAlt);
      expect(renderedLocationImage.src).toBe(map);
    });
  });

  it('The user must be able to bookmark a pokemon from the page.', () => {
    const bookmarkCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(bookmarkCheckbox).toBeInTheDocument();
  });
});
