import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { PokemonDetails } from '../components';
import App from '../App';

// Para esse requisito consultei o repositório do estudante Luiz Wendel
// fonte: https://github.com/tryber/sd-011-project-react-testing-library/pull/21/files

const mockedPokemon = {
  id: 148,
  name: 'Dragonair',
  type: 'Dragon',
  averageWeight: {
    value: '16.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 45',
      map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
    },
    {
      location: 'Johto Dragon\'s Den',
      map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
    },
  ],
  summary: 'They say that if it emits an aura from its whole body.',
};

describe('PokemonDetails tests', () => {
  it('should renders pokemons infos', () => {
    const { getByText, queryByRole } = render(
      <MemoryRouter>
        <PokemonDetails
          isPokemonFavoriteById={ { [mockedPokemon.id]: false } }
          match={ { params: { id: `${mockedPokemon.id}` } } }
          pokemons={ [{ ...mockedPokemon }] }
          onUpdateFavoritePokemons={ () => {} }
        />
      </MemoryRouter>,
    );

    expect(getByText(`${mockedPokemon.name} Details`)).toBeInTheDocument();
    expect(queryByRole('link', { name: 'More details' })).toBeNull();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(`${mockedPokemon.summary}`)).toBeInTheDocument();
  });

  it('should displays maps section with pokemon locations', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PokemonDetails
          isPokemonFavoriteById={ { [mockedPokemon.id]: false } }
          match={ { params: { id: `${mockedPokemon.id}` } } }
          pokemons={ [{ ...mockedPokemon }] }
          onUpdateFavoritePokemons={ () => {} }
        />
      </MemoryRouter>,
    );

    const locationsHeading = getByText(`Game Locations of ${mockedPokemon.name}`);
    expect(locationsHeading).toBeInTheDocument();

    const { foundAt } = mockedPokemon;
    const locationsContainer = locationsHeading.nextElementSibling;
    expect(locationsContainer.childElementCount).toBe(foundAt.length);

    const locations = locationsContainer.children;
    Array.from(locations).forEach((location, index) => {
      expect(location.firstChild.src).toBe(mockedPokemon.foundAt[index].map);
      expect(location.firstChild.alt).toBe(`${mockedPokemon.name} location`);
    });
  });

  it('should be able to favorite a pokemon from detais page', () => {
    const { getByText, getByRole, queryByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('More details'));
    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    fireEvent.click(favoriteCheckbox);
    const favoriteIcon = queryByAltText(/is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(favoriteCheckbox);
    expect(favoriteIcon).not.toBeInTheDocument();
    expect(favoriteCheckbox.parentElement).toHaveTextContent(/pokémon favoritado?/i);
  });
});
