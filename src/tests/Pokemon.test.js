import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';

import pokemons from '../data';
import renderWithHistory from './helpers/renderWithHistory';
import getEmptyFavoritesObject from './helpers/getEmptyFavoritesObject';
import sleep from './helpers/sleep';

import Pokemon from '../components/Pokemon';
import App from '../App';

const NAVIGATION_DELAY = 100;

describe('The pokemon card', () => {
  describe('displays the correct information:', () => {
    let getByAltText;
    let getByTestId;

    const TEST_POKEMON = pokemons[0];

    beforeEach(() => {
      ({ getByAltText, getByTestId } = renderWithHistory(
        <Pokemon
          pokemon={ TEST_POKEMON }
          isFavorite={ getEmptyFavoritesObject()[TEST_POKEMON.id] }
        />,
      ));
    });

    it('name', () => {
      expect(getByTestId('pokemon-name')).toHaveTextContent(TEST_POKEMON.name);
    });

    it('type', () => {
      expect(getByTestId('pokemon-type')).toHaveTextContent(TEST_POKEMON.type);
    });

    it('weight', () => {
      const { value, measurementUnit } = TEST_POKEMON.averageWeight;
      const weightString = `Average weight: ${value} ${measurementUnit}`;

      expect(getByTestId('pokemon-weight')).toHaveTextContent(weightString);
    });

    it('image', () => {
      const { image, name } = TEST_POKEMON;
      const altText = `${name} sprite`;

      expect(getByAltText(altText)).toHaveAttribute('src', image);
    });
  });

  describe('has the correct link, which', () => {
    const TEST_POKEMON = pokemons[0];

    it('points to the right url', () => {
      const { getByText } = renderWithHistory(
        <Pokemon
          pokemon={ TEST_POKEMON }
          isFavorite={ getEmptyFavoritesObject()[TEST_POKEMON.id] }
        />,
      );

      const link = getByText('More details');

      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', `/pokemons/${TEST_POKEMON.id}`);
    });

    it('navigates to the right page', async () => {
      const { history, getByText } = renderWithHistory(<App />);

      const link = getByText('More details');

      fireEvent.click(link);

      await sleep(NAVIGATION_DELAY);

      expect(screen.getByText(`${TEST_POKEMON.name} Details`)).toBeInTheDocument();
      expect(history.location.pathname).toBe(`/pokemons/${TEST_POKEMON.id}`);
    });
  });

  it('shows a star when the pokemon is a favorite', () => {
    const TEST_POKEMON = pokemons[1];

    const { getByAltText } = renderWithHistory(
      <Pokemon
        pokemon={ TEST_POKEMON }
        isFavorite
      />,
    );

    const altText = `${TEST_POKEMON.name} is marked as favorite`;

    expect(getByAltText(altText)).toHaveAttribute('src', '/star-icon.svg');
  });
});
