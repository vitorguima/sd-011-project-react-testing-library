import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const matchProps = {
  path: '/pokemons/:id',
  url: '/pokemons/25',
  isExact: true,
  params: { id: '25' },
};

const isPokemonFavoriteByIdProps = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const isPokemonFavoriteByIdFunc = () => ({
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
});

test('detailed information of the selected Pokémon is shown', () => {
  const { queryByText, getByRole } = render(
    <MemoryRouter>
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteByIdProps }
        match={ matchProps }
        pokemons={ pokemons }
      />
    </MemoryRouter>,
  );

  expect(queryByText('Pikachu Details')).toBeInTheDocument();
  expect(queryByText(/More details/)).toBeNull();
  expect(getByRole('heading', { name: 'Summary' })).toBeInTheDocument();

  const summaryText = queryByText('This intelligent Pokémon roasts hard berries with '
  + 'electricity to make them tender enough to eat.');
  expect(summaryText).toBeInTheDocument();
});

test('section with maps containing pokemon locations', () => {
  const { getByRole, getByText, getAllByAltText } = render(
    <MemoryRouter>
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteByIdProps }
        match={ matchProps }
        pokemons={ pokemons }
      />
    </MemoryRouter>,
  );

  const mapPokemonLocations = getByRole('heading', { name: 'Game Locations of Pikachu' });
  expect(mapPokemonLocations).toBeInTheDocument();

  const locationName = getByText(/Kanto Viridian Forest/);
  expect(locationName).toBeInTheDocument();
  const locationName2 = getByText(/Kanto Power Plant/);
  expect(locationName2).toBeInTheDocument();

  const locations = getAllByAltText(/Pikachu location/);
  expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('user can favorite a pokemon through the details page', () => {
  const { getByRole, queryByAltText } = render(
    <MemoryRouter>
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteByIdProps }
        onUpdateFavoritePokemons={ isPokemonFavoriteByIdFunc }
        match={ matchProps }
        pokemons={ pokemons }
      />
    </MemoryRouter>,
  );

  const favoriteCheckbox = getByRole('checkbox', { name: 'Pokémon favoritado?' });
  expect(favoriteCheckbox).toBeInTheDocument();

  let favoritePokemon = queryByAltText(/Pikachu is marked as favorite/);
  expect(favoritePokemon).toBeInTheDocument();

  const mockFn = jest.fn().mockImplementation(() => {
    favoritePokemon = null;
  });
  fireEvent.click(favoriteCheckbox, mockFn);
  mockFn();
  expect(favoritePokemon).toBeNull();
});
