import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('requirement 6 - test the Pokemon.js component', () => {
  it('rendered a card with the information of a certain Pokemon', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);
    const namePokemon = getByTestId('pokemon-name');
    expect(namePokemon.textContent).toBe('Pikachu');
    const typePokemon = getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');
    const averageWeightPokemon = getByTestId('pokemon-weight');
    expect(averageWeightPokemon.textContent).toBe('Average weight: 6.0 kg');
    const imagePokemon = getByAltText('Pikachu sprite');
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('contains a navigation link to view Pokemon, have URL/id pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
  });

  it('click on Pokémon navigation link, redirect application to details page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  it('URL displayed changes /pokemon/<id>, where <id> is the id of the Pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname: detailsPath } = history.location;
    expect(detailsPath).toBe('/pokemons/25');
  });

  it('there is a star icon in favorite Pokemons', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const startImage = getAllByRole('img')[1];
    expect(startImage).toHaveAttribute('src', '/star-icon.svg');
    expect(startImage)
      .toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
