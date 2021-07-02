import React from 'react';

// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import { fireEvent } from '@testing-library/react';
// import { getByRole } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import { Pokemon } from '../components';

import pokemons from '../data';

test('Teste 1: testa renderização das infos (nome, peso, tipo)', () => {
  const pokefake = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
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
    summary: 'This intelligent Pokémon.',
  };
  const isFavorite = true;

  const { getByTestId, getByText } = renderWithRouter(
    <Pokemon pokemon={ pokefake } isFavorite={ isFavorite } />,
  );

  const nome = getByText('Pikachu');
  expect(nome).toBeInTheDocument();
  const tipo = getByText('Electric');
  expect(tipo).toBeInTheDocument();
  const peso = getByTestId('pokemon-weight');
  expect(peso).toHaveTextContent('Average weight: 6.0 kg');
});

test('Teste 2: testa renderização da imagem do pokémon', () => {
  const pokefake = {
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
    summary: 'This intelligent Pokémon.',
  };
  const isFavorite = true;

  const { getByAltText } = renderWithRouter(
    <Pokemon pokemon={ pokefake } isFavorite={ isFavorite } />,
  );

  const imageAdress = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const image = getByAltText('Pikachu sprite');

  expect(image).toHaveAttribute('src', imageAdress);
  expect(image).toBeInTheDocument();
});

it(' Teste 3: verifica link', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const details = getByRole('link', { name: 'More details' });
  expect(details.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
});

test('Teste 2: testa renderização da imagem do pokémon FAVORITO', () => {
  const { getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);

  const imageAdress = '/star-icon.svg';
  const image = getByAltText(`${pokemons[0].name} is marked as favorite`);

  expect(image).toHaveAttribute('src', imageAdress);
  expect(image).toBeInTheDocument();
});

// test('favorite pokemon icon', () => {
//   const { getAllByRole } = renderWithRouter(<Pokemon
//     pokemon={ pokemons[0] }
//     isFavorite
//   />);
//   const allIcons = getAllByRole('img');
//   expect(allIcons[1].src).toBe('http://localhost/star-icon.svg');
//   expect(allIcons[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
// });

// sintax => // getByRole('coisa da page (button, heading, etc...)', {name: 'oquetemnacoisadapage'}
// npx stryker run ./stryker/Pokemon.conf.json
