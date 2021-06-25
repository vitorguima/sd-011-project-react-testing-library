import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing the "Pokemon" component', () => {
  it('Tests a rendered card with the name of the Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const heading = getByTestId(/pokemon-name/i);
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Pikachu');
  });

  it('Tests whether a card with the Pokémon type and weight is rendered', () => {
    const { getByText, getAllByText, getByAltText } = renderWithRouter(<App />);

    const typePokemon = getAllByText(/Electric/i);
    expect(typePokemon[0]).toBeInTheDocument();

    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();

    const img = getByAltText(/Pikachu sprite/i);
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Tests if there is the link "More details"', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsText = getByText(/More details/i);
    expect(detailsText).toBeInTheDocument();
  });

  it('Test if there is the Pokémon Id by clicking on "More Details"', () => {
    const {
      getByText,
      getByTestId,
      getByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const typePokemon = getByTestId(/pokemon-type/i);
    expect(typePokemon.textContent).toBe('Electric');

    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toContain('star-icon.svg');
  });
});
