import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const isPokemonFavoriteById = true;

const pokemon = { id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' };

describe('Check the behavior of the Pokemon component', () => {
  it('Check pokemon card rendering', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByAltText(`${pokemon.name} sprite`);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemon.name);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(pokemon.type);
    expect(pokemonAverageWeight).toBeInTheDocument();

    const { averageWeight: { value, measurementUnit } } = pokemon;

    expect(pokemonAverageWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const { image } = pokemon;

    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('Check pokemon details link', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );

    const pokemonMoreDetailLink = getByText(/More details/);
    expect(pokemonMoreDetailLink).toBeInTheDocument();
    expect(pokemonMoreDetailLink.pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Check redirect to pokemon details page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const pokemonMoreDetailLink = getByText(/More details/);
    fireEvent.click(pokemonMoreDetailLink);
    const localPath = history.location.pathname;

    expect(localPath).toBe(`/pokemons/${pokemon.id}`);
    expect(getByText(`${pokemon.name} Details`)).toBeInTheDocument();
  });

  it('Check if it is possible to bookmark a pokemon', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const pokemonMoreDetailLink = getByText(/More details/);
    fireEvent.click(pokemonMoreDetailLink);
    const favoritePokemon = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoritePokemon);
    const starIcon = getByAltText(`${pokemon.name} is marked as favorite`);

    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
