import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

const pokemonName = 'pokemon-name';
const pokemons = [
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
    summary: 'The flame on its tail shows the strength...',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary: 'What sounds like its cry may actually be...',
  },
  {
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
    summary: 'They say that if it emits..',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Route 28',
        map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
      },
      {
        location: 'Johto Mount Silver',
        map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
      },
    ],
    summary: 'At full gallop, its four hooves...',
  },
];
const isPokemonFavoriteById = { 4: false, 143: false, 148: false, 78: false };
const pokedex = (<Pokedex
  pokemons={ pokemons }
  isPokemonFavoriteById={ isPokemonFavoriteById }
/>);

describe('Teste componente <Pokedex.js />', () => {
  it('Contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const { getByRole, getByTestId } = renderWithRouter(pokedex);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const currentPokemon = getByTestId(pokemonName);
      expect(currentPokemon.innerHTML).toBe(pokemon.name);
      fireEvent.click(btnNext);
    });
  });

  it('Pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(pokedex);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    const btnFire = getByRole('button', { name: 'Fire' });
    expect(btnFire).toBeInTheDocument();

    fireEvent.click(btnFire);
    const firePokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire');

    firePokemons.forEach((pokemon) => {
      const firePokemon = getByTestId(pokemonName);
      expect(firePokemon.innerHTML).toBe(pokemon.name);
      fireEvent.click(btnNext);
    });
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(pokedex);
    const btnNormal = getByRole('button', { name: 'Normal' });
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnNormal);
    const snorlax = getByTestId(pokemonName);
    expect(snorlax.innerHTML).toBe('Snorlax');

    fireEvent.click(btnAll);
    const charmander = getByTestId(pokemonName);
    expect(charmander.innerHTML).toBe('Charmander');
  });

  it('Cria, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(pokedex);
    const charmander = getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();

    const typeNormal = getByRole('button', { name: 'Normal' });
    expect(typeNormal).toBeInTheDocument();

    const typeDragon = getByRole('button', { name: 'Dragon' });
    expect(typeDragon).toBeInTheDocument();

    const typeFire = getByRole('button', { name: 'Fire' });
    expect(typeFire).toBeInTheDocument();

    const allButtons = getAllByTestId('pokemon-type-button');
    const three = 3;
    expect(allButtons.length).toBe(three);
  });
});
