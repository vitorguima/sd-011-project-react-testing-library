import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('tests Pokemon component', () => {
  it('check a pokemon card is rendered with its informations', () => {
    const { getByText, getAllByText, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = getAllByText('Electric');
    const typesRendered = 2;
    expect(pokemonType.length).toEqual(typesRendered);
    const pokemonWeigth = getByText('Average weight: 6.0 kg');
    expect(pokemonWeigth).toBeInTheDocument();
    const pokemonImage = getByAltText('Pikachu sprite');
    const imageSource = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImage).toHaveAttribute('src', imageSource);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('checks if the details page is rendered', () => {
    const { getByText, history, getByRole, getByAltText } = renderWithRouter(<App />);
    const detailsLink = getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteCheckBox = getByRole('checkbox');
    expect(favoriteCheckBox).toBeInTheDocument();
    fireEvent.click(favoriteCheckBox);
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    const imageSource = '/star-icon.svg';
    expect(favoriteIcon).toHaveAttribute('src', imageSource);
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
