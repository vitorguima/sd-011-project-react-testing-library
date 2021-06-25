import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testing the Pokemon component', () => {
  const example = {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Goldenrod Game Corner',
        map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary:
      'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  };

  const { averageWeight, id, image, name, type } = example;
  const { measurementUnit, value } = averageWeight;

  // it('Test if the card component is rendered', () => {
  //   const { getByTestId } = renderWithRouter(<Pokemon />);
  // });

  it('Test if the card component is rendered', () => {
    const { getByTestId, getByAltText, getByText } = renderWithRouter(
      <Pokemon pokemon={example} isFavorite={true} />
    );
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    expect(name.textContent).toBe('Ekans');
    expect(type.textContent).toBe('Poison');
    expect(type).toBeInTheDocument();
    const weight = getByTestId('pokemon-weight');
    const imgPokemon = getByAltText('Ekans sprite');
    const imgFavorite = getByAltText('Ekans is marked as favorite');
    const moreDetails = getByText('More details');
    expect(moreDetails.href).toBe(`http://localhost/pokemons/${id}`);
    expect(weight.textContent).toBe(`Average weight: 6.9 kg`);
    expect(imgPokemon.src).toBe(
      'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png'
    );

    expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
