import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemon = { id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' };

describe('Check the behavior of the PokemonDetails component', () => {
  it('Check if detailed pokemon information is shown', () => {
    const { getByRole, getByText, getByTestId, history } = renderWithRouter(<App />);

    const electricPokemonFilter = getByRole('button', { name: /Electric/ });
    const nextPokemonBtn = getByRole('button', { name: /Próximo pokémon/ });

    expect(electricPokemonFilter).toBeInTheDocument();
    expect(nextPokemonBtn).toBeInTheDocument();

    fireEvent.click(electricPokemonFilter);

    expect(nextPokemonBtn.disabled).toBe(true);

    const moreDetailsBtn = getByText(/More details/);

    expect(moreDetailsBtn).toBeInTheDocument();

    fireEvent.click(moreDetailsBtn);

    const currentPathname = history.location.pathname;

    const { id, name, type, averageWeight, summary } = pokemon;
    const { value, measurementUnit } = averageWeight;

    expect(currentPathname).toBe(`/pokemons/${id}`);

    const title = getByText(`${name} Details`);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    const summaryTitle = getByText(/Summary/);
    const summaryInfo = getByText(summary);

    expect(title).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe(`${name}`);
    expect(pokemonType.innerHTML).toBe(`${type}`);
    expect(pokemonAverageWeight.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(moreDetailsBtn).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryInfo).toBeInTheDocument();
  });

  it('Check if pokemon location is rendered', () => {
    const { getByRole, getByText, getAllByAltText, history } = renderWithRouter(<App />);

    const electricPokemonFilter = getByRole('button', { name: /Electric/ });
    const nextPokemonBtn = getByRole('button', { name: /Próximo pokémon/ });

    expect(electricPokemonFilter).toBeInTheDocument();
    expect(nextPokemonBtn).toBeInTheDocument();

    fireEvent.click(electricPokemonFilter);

    expect(nextPokemonBtn.disabled).toBe(true);

    const moreDetailsBtn = getByText(/More details/);

    expect(moreDetailsBtn).toBeInTheDocument();

    fireEvent.click(moreDetailsBtn);

    const currentPathname = history.location.pathname;

    const { id, name, foundAt } = pokemon;

    expect(currentPathname).toBe(`/pokemons/${id}`);

    const pokemonGameLocation = getByText(`Game Locations of ${name}`);

    expect(pokemonGameLocation).toBeInTheDocument();

    const allPokemonsLocations = getAllByAltText(`${name} location`);

    allPokemonsLocations.forEach((location, index) => {
      expect(location.src).toBe(foundAt[index].map);
      expect(location.alt).toBe(`${name} location`);
    });
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
