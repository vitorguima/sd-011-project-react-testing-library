import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId,
      getAllByRole } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonAverageWeigth = getByTestId('pokemon-weight');
    expect(pokemonAverageWeigth.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImage = getAllByRole('img');
    expect(pokemonImage[0].alt).toBe('Pikachu sprite');
    expect(pokemonImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link de detalhes', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const pokemonDetails = getAllByRole('link');
    expect(pokemonDetails[0].href).toBe('http://localhost/pokemons/25');
  });

  it('Teste se clicar no link do Pokémon, é redirecionado para pagina detalhes', () => {
    const { getByText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const pokemonDetailsLink = getByText('More details');
    expect(pokemonDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const starred = getByAltText('Pikachu is marked as favorite');
    expect(starred).toHaveAttribute('src', '/star-icon.svg');
  });
});
