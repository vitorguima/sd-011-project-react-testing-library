import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import { PokemonDetails } from '../components';

const pokemon = [
  {
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
    summary: 'This intelligent Pokémon r...',
  },
];

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste informações, localização e se o pokemon selecionado é favoritado', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(
      <App pokemon={ pokemon } />,
    );

    const moreDetails = getByRole('link', {
      name: /More Details/i,
    });
    fireEvent.click(moreDetails);
    expect(moreDetails.href).toContain('/pokemons/25');

    const tagh2 = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(tagh2).toBeInTheDocument();

    const sumaryh2 = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(sumaryh2).toBeInTheDocument(pokemon.summary);

    const sumaryp = getByText(/This intelligent Pokémon roasts hard berries.../i);
    expect(sumaryp).toBeInTheDocument();

    const detailsh2 = getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(detailsh2).toBeInTheDocument(pokemon.name);

    const favorite = getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    const himg = getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(himg).toBeInTheDocument();

    const mapPik = getAllByRole('img', { name: 'Pikachu location' });
    expect(mapPik.length).toBe(2);
    expect(mapPik[0].src)
      .toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});
