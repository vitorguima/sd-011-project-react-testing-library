import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
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
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
  },
];
const favPokemon = {
  4: false,
  25: false,
};

const filterId = 'pokemon-type-button';

describe('Verifies if the About component', () => {
  it('renders a h2 with the text `Encountered pokémons`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('render the Pokémon cards and navigate between them', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    const btnNext = getByText(/Próximo pokémon/i);
    expect(btnNext).toBeInTheDocument();
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(/Pikachu/i);
    fireEvent.click(btnNext);
    expect(pokeName).toHaveTextContent(/Charmander/i);
    fireEvent.click(btnNext);
    expect(pokeName).toHaveTextContent(/Pikachu/i);
  });

  it('renders only one card at a time', () => {
    const { container } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    const pokeCard = container.querySelectorAll('.pokemon');
    expect(pokeCard.length).toBe(1);
  });

  it('filter Pokémon by their type', () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    const btnNext = getByText(/Próximo pokémon/i);
    const btnFire = getAllByTestId(filterId)
      .find((btn) => btn.innerHTML === 'Fire');
    expect(btnFire).toBeInTheDocument();
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/Electric/i);
    fireEvent.click(btnFire);
    expect(pokeType).toHaveTextContent(/Fire/i);
    fireEvent.click(btnNext);
    expect(pokeType).toHaveTextContent(/Fire/i);
  });

  it('resets the type filter', () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    const btnFire = getAllByTestId(filterId)
      .find((btn) => btn.innerHTML === 'Fire');
    const btnAll = getByText(/All/i);
    expect(btnAll).toBeInTheDocument();
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/Electric/i);
    fireEvent.click(btnFire);
    expect(pokeType).toHaveTextContent(/Fire/i);
    fireEvent.click(btnAll);
    expect(pokeType).toHaveTextContent(/Electric/i);
  });

  it('creates the type buttons dynamically', () => {
    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    const btnAll = getByText(/All/i);
    expect(btnAll).toBeInTheDocument();
    const filterBtns = getAllByTestId(filterId);
    expect(filterBtns.length).toBe(2);
    fireEvent.click(filterBtns[0]);
    expect(btnAll).toBeInTheDocument();
  });

  it('when there`s only one Pokémon filtered, the next button is disabled', () => {
    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokemon } />
      </MemoryRouter>,
    );

    const btnNext = getByText(/Próximo pokémon/i);
    expect(btnNext).not.toHaveAttribute('disabled');
    const btnElec = getAllByTestId(filterId)
      .find((btn) => btn.innerHTML === 'Electric');
    fireEvent.click(btnElec);
    expect(btnNext).toHaveAttribute('disabled');
  });
});
