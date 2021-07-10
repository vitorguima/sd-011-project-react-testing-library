import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Component Tests <Pokemon.js />', () => {
  it('Renders a card with the information of a certain Pokémon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe('Pikachu');

    const pokemonType = getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toBe('Electric');

    const pokemonWeight = getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');

    const img = getByRole('img');
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Contains a navigation link to view Pokémon details', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    expect(moreDetails.href).toMatch('/pokemons/25');
  });

  it('Redirects from application to Pokémon details page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    userEvent.click(moreDetails);
    const pikachuDetails = getByText(/Pikachu Details/);
    expect(pikachuDetails).toBeInTheDocument();

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('There is a star icon in favorite Pokemons', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    userEvent.click(moreDetails);

    const favorite = getByText(/Pokémon favoritado?/);
    userEvent.click(favorite);

    const imgs = getAllByRole('img');
    expect(imgs[1].alt).toBe('Pikachu is marked as favorite');
    expect(imgs[1].src).toMatch('/star-icon.svg');
  });
});
