import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App pokemon={ pokemon } />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokType = getByTestId('pokemon-type');
    expect(pokType.innerHTML).toBe('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const pokImg = getByRole('img', { alt: 'Pikachu sprite' });
    expect(pokImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('O link deve possuir a URL /pokemons/<id>, o id será do Pokémon exibido', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /More Details/i,
    });
    expect(moreDetails.href).toContain('/pokemons/25');
    fireEvent.click(moreDetails);
  });

  test('É feito o redirecionamento da aplicação para a página de detalhes.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /More Details/i,
    });
    expect(`${moreDetails}25`).toContain('/pokemons/25');
    fireEvent.click(moreDetails);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', {
      name: /More Details/i,
    });
    fireEvent.click(moreDetails);
    expect(moreDetails.href).toContain('/pokemons/');

    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const imgCheck = getByRole('img', {
      name: 'Pikachu is marked as favorite',
      scr: '/star-icon.svg',
    });
    expect(imgCheck.src).toContain('/star-icon.svg');

    const pokCheck = getByRole('img', { name: 'Pikachu sprite' });
    expect(pokCheck).toBeInTheDocument();
  });
});
