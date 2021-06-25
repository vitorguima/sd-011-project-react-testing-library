import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

const pokemonName = 'pokemon-name';

describe('Teste componente <Pokedex.js />', () => {
  it('Contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();

    const arrayPokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    arrayPokemons.forEach((pokemon) => {
      fireEvent.click(btnNext);
      const currentPokemon = getByTestId(pokemonName);
      expect(currentPokemon.innerHTML).toBe(pokemon);
    });
  });

  it('Pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    const btnFire = getByRole('button', { name: 'Fire' });
    expect(btnFire).toBeInTheDocument();

    fireEvent.click(btnFire);
    const firePokemons = ['Rapidash', 'Charmander'];

    firePokemons.forEach((pokemon) => {
      fireEvent.click(btnNext);
      const firePokemon = getByTestId(pokemonName);
      expect(firePokemon.innerHTML).toBe(pokemon);
    });
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnPsychic = getByRole('button', { name: 'Psychic' });
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnPsychic);
    const alakazam = getByTestId(pokemonName);
    expect(alakazam.innerHTML).toBe('Alakazam');

    fireEvent.click(btnAll);
    const pikachu = getByTestId(pokemonName);
    expect(pikachu.innerHTML).toBe('Pikachu');
  });

  it('Cria, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const pokemons = [{
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
      summary: 'What sounds...',
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
      summary: 'They say that if...',
    }];

    const isPokemonFavoriteById = { 143: false, 148: false };
    const pokedex = (
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />
    );
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(pokedex);
    const snorlax = getByText(/Snorlax/);
    expect(snorlax).toBeInTheDocument();

    const typeNormal = getByRole('button', { name: 'Normal' });
    expect(typeNormal).toBeInTheDocument();

    const typeDragon = getByRole('button', { name: 'Dragon' });
    expect(typeDragon).toBeInTheDocument();

    const allButtons = getAllByTestId('pokemon-type-button');
    expect(allButtons.length).toBe(2);
  });
});
