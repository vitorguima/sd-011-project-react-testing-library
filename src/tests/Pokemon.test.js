import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Tests the Pokemon.js component', () => {
  it('should correctly display a pokemon card', () => {
    const { getByTestId, getAllByRole, getByText,
      getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const pokeNameElement = getByTestId('pokemon-name');
    const pokeName = pokeNameElement.innerHTML;
    const pokeObj = pokemons.find((obj) => obj.name === pokeName);
    expect(pokeNameElement).toHaveTextContent(pokeObj.name);

    const pokeTypeElement = getByTestId('pokemon-type');
    const pokeType = pokeTypeElement.innerHTML;
    const pokeObj2 = pokemons.find((obj) => obj.type === pokeType);
    expect(pokeTypeElement).toHaveTextContent(pokeObj2.type);

    const pokeAWElement = getByTestId('pokemon-weight');
    const pokeAWeight = parseFloat((pokeAWElement.innerHTML)
      .match(/[+-]?\d+(\.\d+)?/g).join('')).toFixed(1);
    const pokeObj3 = pokemons.find((obj) => obj.averageWeight.value === pokeAWeight);
    const txt = `Average weight: ${pokeObj3
      .averageWeight.value} ${pokeObj3.averageWeight.measurementUnit}`;
    expect(pokeAWElement).toHaveTextContent(txt);

    const pokePic = getAllByRole('img')[0];
    const picURL = pokeObj.image;
    expect(pokePic).toHaveAttribute('src', picURL);
    expect(pokePic).toHaveAttribute('alt', `${pokeObj.name} sprite`);

    const link = getByText('More details');
    const pokeId = pokeObj.id;
    expect(link).toHaveAttribute('href', `/pokemons/${pokeId}`);

    const favoriteIcon = getByAltText(`${pokeObj.name} is marked as favorite`);
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
