import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the component Pokemon', () => {
  it('Test appears a card with the infos about a specified Pokémon ', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);

    const namePokemon = getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(typePokemon).toBeInTheDocument();

    const averageweightPokemon = getByTestId('pokemon-weight');
    expect(averageweightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(averageweightPokemon).toBeInTheDocument();

    const img = getByAltText('Pikachu sprite');
    const urlImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toHaveAttribute('src', urlImg);
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Test if More Details of Pokemon is rendered', () => {
    const { getByText, history, getByRole, container } = renderWithRouter(<App />);

    const details = getByText('More details');
    expect(details).toBeInTheDocument();
    fireEvent.click(details);

    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');

    const checkboxButton = getByRole('checkbox');
    expect(checkboxButton).toBeInTheDocument();
    fireEvent.click(checkboxButton);

    const redirect = getByText('Home');
    fireEvent.click(redirect);

    const favoriteIcon = container.querySelector('.favorite-icon');
    expect(favoriteIcon).toBeInTheDocument();

    const urlIcon = '/star-icon.svg';
    expect(favoriteIcon).toHaveAttribute('src', urlIcon);
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
