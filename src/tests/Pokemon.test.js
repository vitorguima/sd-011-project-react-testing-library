import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import { renderWithRouter, waitFor } from '../helpers';
import pokemons from '../data';
import { isPokemonFavoriteById } from '../mockedFavoritePokemons';

const pokemon = pokemons[0];
const isFavorite = isPokemonFavoriteById[pokemon.id];
const showDetailsLink = true;
let historyFromRender;

describe('Pokemon.js:', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
        showDetailsLink={ showDetailsLink }
      />,
    );

    historyFromRender = history;
  });

  it('There must be a card with information about a given pokemon.', () => {
    const { name, type, averageWeight, image: imageSource } = pokemon;
    const { value, measurementUnit } = averageWeight;
    const averageWeightFormat = `average weight: ${value} ${measurementUnit}`;
    const pokemonName = screen.getByText(new RegExp(`${name}`, 'i'));
    const pokemonType = screen.getByText(new RegExp(`${type}`, 'i'));
    const pokemonAverageWeight = screen.getByText(new RegExp(averageWeightFormat, 'i'));
    const imageNameFormat = new RegExp(`${name} sprite`, 'i');
    const pokemonImage = screen.getByRole('img', { name: imageNameFormat });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonAverageWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(imageSource);
  });

  it('There must be a link to the details page of a given pokemon.', () => {
    const { id } = pokemon;
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toMatch(new RegExp(`/pokemons/${id}`, 'i'));
  });

  it('The user must be redirected to the details page '
    + 'after clicking the details link.', async () => {
    const { id, name } = pokemon;
    const detailsPageHeadingFormat = new RegExp(`${name} details`, 'i');
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(detailsLink);

    expect(historyFromRender.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('There must be a star icon if the pokemon is bookmarked.', () => {
    const { name } = pokemon;
    const starIcon = screen.getByRole('img', {
      name: new RegExp(`${name} is marked as favorite`),
    });

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toMatch(new RegExp('/star-icon.svg'));
  });
});
