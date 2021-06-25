import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';

describe('Testing component Pokemon', () => {
  it('Testing pokemon Status', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId(POKEMON_NAME);
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Details Pokemons Link', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    const pokemonName = getByTestId(POKEMON_NAME);
    const endURL = Data.find((element) => element.name === pokemonName.textContent).id;
    fireEvent.click(moreDetails);
    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${endURL}`);
  });

  it('Favorited Icon Check', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    fireEvent.click(screen.getByText('Home'));
    const pokemonName = screen.getByTestId(POKEMON_NAME).textContent;
    const favoritedImage = screen.getByAltText(`${pokemonName} is marked as favorite`);
    expect(favoritedImage).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritedImage).toHaveAttribute('alt', `${pokemonName} is marked as favorite`);
  });
});
