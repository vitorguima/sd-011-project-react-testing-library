import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requisito 6', () => {
  it('if pokemon\'s name is correct', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const nameElement = getByTestId('pokemon-name');

    expect(nameElement).toHaveTextContent(/pikachu/i);
  });

  it('if pokemon\'s type is correct', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const typeElement = getByTestId('pokemon-type');

    expect(typeElement).toHaveTextContent(/electric/i);
  });

  it('if pokemon\'s weight is correct', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const weightElement = getByTestId('pokemon-weight');

    expect(weightElement).toHaveTextContent(/average weight: 6.0 kg/i);
  });

  it('if pokemon\'s image is correct', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const imageElement = getByAltText(/pikachu sprite/i);

    expect(imageElement.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('if pokemon\'s weight is correct', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('if pokemon\'s favorite star is correct', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const toFavorite = document.getElementById('favorite');
    fireEvent.click(toFavorite);

    const favoriteStar = getByAltText(/pikachu is marked as favorite/i);

    expect(favoriteStar.src.match(/star-icon.svg/)[0]).toBe('star-icon.svg');
  });
});
