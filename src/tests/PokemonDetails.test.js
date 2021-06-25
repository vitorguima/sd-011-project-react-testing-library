import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

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
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  const { averageWeight, id, image, name, type, summary, foundAt } = example;
  const { measurementUnit, value } = averageWeight;

  it('Should return the selected pokemon details', () => {
    const { getByTestId, getByAltText, getByText, history } = renderWithRouter(
      <App />
    );
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Should have the exactly pokemon name', () => {
    const { getByTestId, getByAltText, getByText, history, getAllByRole } =
      renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
    expect(getAllByRole('heading')[2].textContent).toBe('Summary');
  });

  it('Should have the pokemons location map', () => {
    const { getByLabelText, getByText, getAllByRole, getAllByAltText } =
      renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    const heading = getAllByRole('heading')[3];
    expect(getByText(summary)).toBeInTheDocument();
    expect(heading.textContent).toBe(`Game Locations of ${name}`);
    const imgs = getAllByAltText('Pikachu location');
    expect(imgs[0].src).toBe(foundAt[0].map);
    expect(imgs[1].src).toBe(foundAt[1].map);
    const label = getByLabelText('Pokémon favoritado?', { selector: 'input' });
    expect(label).toBeInTheDocument();
    console.log(label);
  });
});
