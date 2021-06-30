import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Checks Pokemon component', () => {
  it('Checks if it renders a card with pokémon infos', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonName = getByText(/Pikachu/i);
    const pokemonType = screen.getAllByText(/Electric/i);
    const pokemonWeight = getByText(/Average weight: 6.0 kg/i);
    const image = screen.getByRole('img');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType[0]).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toContain('Pikachu sprite');
  });

  it('Checks if the pokemon card has a Link with url and id', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId(/pokemon-type/i);
    expect(typeButton[0]).toHaveTextContent('Electric');
    fireEvent.click(typeButton[0]);
    const pokemonLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
  });
  it('checks if the button details works and if a pokemon has a star (favorite)', () => {
    const {
      getByAltText,
      getByLabelText,
    } = renderWithRouter(<App />);
    const typeButton = screen.getByRole('button', { name: /Electric/i });
    expect(typeButton).toBeInTheDocument();
    fireEvent.click(typeButton);
    const pokemonLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonLink).toBeInTheDocument();
    fireEvent.click(pokemonLink);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    const favoritePokemon = getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
