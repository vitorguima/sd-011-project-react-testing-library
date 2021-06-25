import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests of pokemon component', () => {
  test('test if render card with pokemon info', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemon-type').textContent).toBe('Electric');
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('navigation link to show pokemon details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText('More details');
    fireEvent.click(link);
    const path = history.location.pathname;

    expect(path).toBe('/pokemons/25');
    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

  test('test if favorited pokemons are marked', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const link = getByText('More details');
    fireEvent.click(link);

    const Favorite = getByText('Pokémon favoritado?');
    fireEvent.click(Favorite);

    const image = getByAltText('Pikachu is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/star-icon.svg');
  });
});
