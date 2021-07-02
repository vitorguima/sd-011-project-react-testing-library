import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';

const pokemonProps = {
  averageWeight: { value: '6.0', measurementUnit: 'kg' },
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  summary: 'This intelligent Pokémon roasts hard berries with '
  + 'electricity to make them tender enough to eat.',
};

test('renders a card with the information of a certain Pokémon', () => {
  const { getByTestId, getByAltText } = render(
    <MemoryRouter>
      <Pokemon
        isFavorite
        pokemon={ pokemonProps }
        showDetailsLink
      />
      ,
    </MemoryRouter>,
  );

  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemon-type');
  const pokemonWeight = getByTestId('pokemon-weight');
  const pokemonImage = getByAltText(`${pokemonProps.name} sprite`);

  expect(pokemonName.textContent).toBe(pokemonProps.name);
  expect(pokemonType.textContent).toBe(pokemonProps.type);

  const { averageWeight: { value, measurementUnit } } = pokemonProps;
  expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

  expect(pokemonImage).toHaveAttribute('src', `${pokemonProps.image}`);
});

test('link in card redirect to correct URL', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokemon
        isFavorite
        pokemon={ pokemonProps }
        showDetailsLink
      />
      ,
    </MemoryRouter>,
  );

  const link = getByText(/More details/i);

  expect(link).toHaveAttribute('href', `/pokemons/${pokemonProps.id}`);
});

test('displays a star icon on favorite Pokemons', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <Pokemon
        isFavorite
        pokemon={ pokemonProps }
        showDetailsLink
      />
      ,
    </MemoryRouter>,
  );

  const starIcon = getByAltText(`${pokemonProps.name} is marked as favorite`);

  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
