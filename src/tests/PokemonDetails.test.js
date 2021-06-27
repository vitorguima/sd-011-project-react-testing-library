import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';

describe('7 - Tests the PokemonDetails component', () => {
  it('Should display the detailed information on the pokemon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/More details/);
    fireEvent.click(moreDetailsLink);

    const pokeName = getByTestId('pokemon-name').innerHTML;
    const h2Title = getByText(`${pokeName} Details`);
    expect(h2Title).toBeInTheDocument();

    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryH2Text = getByText(/Summary/);

    expect(summaryH2Text).toBeInTheDocument();

    const summaryText = pokemons[0].summary;
    const summaryTextP = getByText(summaryText);
    expect(summaryTextP).toBeInTheDocument();
  });

  it('Should display section with maps and locations', () => {
    const { getByText, getByTestId, getAllByAltText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/More details/);
    fireEvent.click(moreDetailsLink);

    const pokeName = getByTestId('pokemon-name').innerHTML;
    const h2LocTitle = getByText(`Game Locations of ${pokeName}`);
    expect(h2LocTitle).toBeInTheDocument();

    const imgLocation = getAllByAltText(`${pokeName} location`)[0];
    const URLlocation = pokemons[0].foundAt[0].map;
    expect(imgLocation).toHaveAttribute('src', URLlocation);
    expect(imgLocation).toHaveAttribute('alt', `${pokeName} location`);
  });

  it('Should display the favorite checkbox option', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/More details/);
    fireEvent.click(moreDetailsLink);

    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});
