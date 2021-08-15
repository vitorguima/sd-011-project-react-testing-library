import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('tests Pokemon component', () => {
  it('checks if the details page is rendered', () => {
    const {
      getByText,
      history,
      getAllByAltText,
      getByRole,
      getByLabelText } = renderWithRouter(<App />);
    const detailsLink = getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const nameDetail = getByText('Pikachu Details');
    expect(nameDetail).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    const description = getByText(/This intelligent Pokémon roasts hard berries with/i);
    expect(description).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    const totalLocations = getAllByAltText('Pikachu location');
    const amountOfLocations = 2;
    expect(totalLocations.length).toEqual(amountOfLocations);
    expect(totalLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const getCheckBox = getByRole('checkbox');
    expect(getCheckBox).toBeInTheDocument();
    const getCheckLabel = getByLabelText('Pokémon favoritado?');
    expect(getCheckLabel).toBeInTheDocument();
    fireEvent.click(getCheckBox);
    expect(getCheckBox.checked).toBe(true);
    fireEvent.click(getCheckBox);
    expect(getCheckBox.checked).toBe(false);
  });
});
