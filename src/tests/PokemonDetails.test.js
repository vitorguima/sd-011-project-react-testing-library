import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { PokemonDetails } from '../components';

const pokemonNameTestId = 'pokemon-name';

const mockedPokemon = {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
    },
    {
      location: 'Johto Route 31',
      map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
    },
    {
      location: 'Ilex Forest',
      map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
    },
    {
      location: 'Johto National Park',
      map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
    },
  ],
  summary: 'For protection, it releases a horrible stench.',
};

test('should render pokémon info', () => {
  render(
    <MemoryRouter>
      <PokemonDetails
        isPokemonFavoriteById={ { [mockedPokemon.id]: false } }
        match={ { params: { id: `${mockedPokemon.id}` } } }
        onUpdateFavoritePokemons={ () => { } }
        pokemons={ [{ ...mockedPokemon }] }
      />
    </MemoryRouter>,
  );

  expect(screen.getByText(`${mockedPokemon.name} Details`)).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();
  const summaryHeading = screen.getByRole('heading', { level: 2, name: 'Summary' });
  expect(summaryHeading).toBeInTheDocument();
  expect(summaryHeading.nextElementSibling).toBeInTheDocument();
  expect(summaryHeading.nextElementSibling.textContent).toBe(mockedPokemon.summary);
});

it('should have a section with the pokémon locations', () => {
  render(
    <MemoryRouter>
      <PokemonDetails
        isPokemonFavoriteById={ { [mockedPokemon.id]: false } }
        match={ { params: { id: `${mockedPokemon.id}` } } }
        onUpdateFavoritePokemons={ () => { } }
        pokemons={ [{ ...mockedPokemon }] }
      />
    </MemoryRouter>,
  );

  const pokemonName = screen.getByTestId(pokemonNameTestId).textContent;
  const locationsHeading = screen
    .getByRole('heading', { level: 2, name: `Game Locations of ${pokemonName}` });
  expect(locationsHeading).toBeInTheDocument();

  const locationElements = locationsHeading.nextElementSibling.children;
  expect(locationElements).toHaveLength(mockedPokemon.foundAt.length);

  Array.from(locationElements).forEach((location, index) => {
    expect(location.firstChild.src).toBe(mockedPokemon.foundAt[index].map);
    expect(location.firstChild.alt).toBe(`${mockedPokemon.name} location`);
  });
});

it('should be able to favorite the pokémon', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonName = screen.getByTestId(pokemonNameTestId).textContent;
  userEvent.click(screen.getByRole('link', { name: 'More details' }));

  const favoriteCheckbox = screen.getByRole('checkbox');
  expect(favoriteCheckbox).toBeInTheDocument();
  expect(favoriteCheckbox.previousSibling.textContent).toMatch(/pokémon favoritado?/i);

  let favoriteIcon = screen.queryByAltText(`${pokemonName} is marked as favorite`);
  expect(favoriteIcon).not.toBeInTheDocument();

  expect(favoriteCheckbox).not.toBeChecked();

  userEvent.click(favoriteCheckbox);
  expect(favoriteCheckbox).toBeChecked();
  favoriteIcon = screen.queryByAltText(`${pokemonName} is marked as favorite`);
  expect(favoriteIcon).toBeInTheDocument();

  userEvent.click(favoriteCheckbox);
  expect(favoriteCheckbox).not.toBeChecked();
  favoriteIcon = screen.queryByAltText(`${pokemonName} is marked as favorite`);
  expect(favoriteIcon).not.toBeInTheDocument();
});
