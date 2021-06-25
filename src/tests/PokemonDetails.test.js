import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing the PokemonDetails component', () => {
  const example = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon roasts'
      + ' hard berries with electricity to make them tender enough to eat.',
  };

  const details = 'More details';
  const { name, summary, foundAt } = example;

  it('Should return the selected pokemon details', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    const moreDetails = getByText(details);
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Should have the exactly pokemon name', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(details);
    userEvent.click(moreDetails);
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
    expect(getAllByRole('heading')[2].textContent).toBe('Summary');
  });

  it('Should have the pokemons location map', () => {
    const { getByLabelText,
      getByText,
      getAllByRole,
      getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(details);
    userEvent.click(moreDetails);
    const heading = getAllByRole('heading')[3];
    expect(getByText(summary)).toBeInTheDocument();
    expect(heading.textContent).toBe(`Game Locations of ${name}`);
    const imgs = getAllByAltText('Pikachu location');
    expect(imgs[0].src).toBe(foundAt[0].map);
    expect(imgs[1].src).toBe(foundAt[1].map);
    const label = getByLabelText('Pokémon favoritado?', { selector: 'input' });
    expect(label).toBeInTheDocument();
  });
});
