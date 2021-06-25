import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const MORE_DETAILS = 'More details';

describe('Testando o Component PokemonDetails', () => {
  it('If Details of the Pokemon is in screen.', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    const moreDetails = getByText(MORE_DETAILS);
    fireEvent.click(moreDetails);

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const headings = getAllByRole('heading', { level: 2 });
    expect(headings[1]).toBeInTheDocument();
    expect(headings[1].textContent).toBe('Summary');
    const summaryText = getByText(/This intelligent Pokémon roasts hard/).textContent;
    const innerSummary = 'This intelligent Pokémon roasts hard berries with electricity';
    expect(summaryText).toBe(`${innerSummary} to make them tender enough to eat.`);
  });

  it('If info section of maps is on page', () => {
    const { getByTestId, getByText, getAllByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name').textContent;
    const moreDetails = getByText(MORE_DETAILS);
    fireEvent.click(moreDetails);

    const headings = getAllByRole('heading', { level: 2 });
    expect(headings[2]).toBeInTheDocument();
    expect(headings[2].textContent).toBe(`Game Locations of ${pokemonName}`);
    const imagesSpawns = getAllByRole('img');
    expect(imagesSpawns[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagesSpawns[1]).toHaveAttribute('alt', `${pokemonName} location`);
    expect(imagesSpawns[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imagesSpawns[2]).toHaveAttribute('alt', `${pokemonName} location`);
  });

  it('If user can favorite one pokemon.', () => {
    const { getByLabelText, getByText, getByAltText } = renderWithRouter(<App />);

    const moreDetails = getByText(MORE_DETAILS);
    fireEvent.click(moreDetails);
    const checkBox = getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkBox);
    const altText = getByAltText('Pikachu is marked as favorite');
    expect(altText).toBeInTheDocument();
    fireEvent.click(checkBox);
    expect(altText).not.toBeInTheDocument();
  });
});
