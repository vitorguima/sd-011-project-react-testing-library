import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import Pokemon from '../components/Pokemon';
import App from '../App';

// este se é renderizado um card com as informações de determinado pokémon.
const Pikachu = {
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
  summary: 'This intelligent Pokémon roasts hard ...',
};

test('O nome correto do Pokémon deve ser mostrado na tela', () => {
  const { getByTestId } = renderWithRouter(<App pokemon={ Pikachu } />); // passo a const que eu quero, no caso o pikachu da linha 7
  const getPikachu = getByTestId('pokemon-name');
  expect(getPikachu).toHaveTextContent('Pikachu');
});

test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
  const { getByTestId } = renderWithRouter(<App pokemon={ Pikachu } />);
  const getPikachuType = getByTestId('pokemon-type');
  expect(getPikachuType).toHaveTextContent('Electric');
});

test('O peso médio do pokémon deve ser exibido', () => {
  const { getByTestId } = renderWithRouter(<App pokemon={ Pikachu } />);
  const getPikachuType = getByTestId('pokemon-weight');
  expect(getPikachuType).toHaveTextContent('Average weight: 6.0 kg');
});

test('A imagem do Pokémon deve ser exibida.', () => {
  const { getByRole } = renderWithRouter(<App pokemon={ Pikachu } />);
  const getPikachuImg = getByRole('img', { alt: 'Pikachu sprite' });
  expect(getPikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Teste se o card contém um link de navegação para exibir detalhes', () => {
  const { getByRole, history } = renderWithRouter(<App pokemon={ Pikachu } />);
  const pikachuDetails = getByRole('link', { name: /More details/i });
  fireEvent.click(pikachuDetails);
  const pathPikachu = history.location.pathname;
  expect(pathPikachu).toBe('/pokemons/25');
});

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  const { getByRole } = renderWithRouter(<App pokemon={ Pikachu } />);
  const pikachuDetails = getByRole('link', { name: /More details/i });
  fireEvent.click(pikachuDetails);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByRole, history } = renderWithRouter(<App pokemon={ Pikachu } />);
  const pikachuDetails = getByRole('link', { name: /More details/i });
  fireEvent.click(pikachuDetails);
  const pathPikachu = history.location.pathname;
  expect(pathPikachu).toBe('/pokemons/25');
  const checkbox = getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  const starIcon = getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  const findPikachuImg = getByRole('img', { name: 'Pikachu sprite' });
  expect(findPikachuImg).toBeInTheDocument();
});
