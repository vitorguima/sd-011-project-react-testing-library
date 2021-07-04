import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWhithRouter from '../renderWithRouter';

const pokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Eletric',
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
    ],
    sumary: 'This intelligent Pokémon r...',
  },
];

describe('Requisito 07, Pokémon Details', () => {
  it('Teste as informações, localização e se o pokemon selecionado é favoritado', () => {
    const { getByRole, getByText, getAllByRole } = renderWhithRouter(
      <App pokemon={ pokemon } />,
    );

    const moreDetails = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(moreDetails);
    expect(moreDetails.href).toContain('/pokemons/25');

    const tagh2 = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(tagh2).toBeInTheDocument();

    const sumary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(sumary).toBeInTheDocument(pokemon.sumary);

    const sumaryP = getByText(/This intelligent Pokémon roasts hard berries.../i);
    expect(sumaryP).toBeInTheDocument();

    const details = getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(details).toBeInTheDocument(pokemon.name);

    const favorite = getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    const himg = getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(himg).toBeInTheDocument();

    const map = getAllByRole('img', { name: 'Pikachu location' });
    expect(map.length).toBe(2);
    expect(map[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});
