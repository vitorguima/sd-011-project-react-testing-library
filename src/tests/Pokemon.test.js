import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('O nome e o tipo correto do pokémon aparece na tela', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getAllByText(/eletric/i)).toHaveLength(2);
});

test('O peso medio do pokémon deve ser exibido', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weigth:6.0kg');
});

test('A imagem deve conter um atributo src com URL da imagem do pokémon', () => {
  const { getByRole, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});

test('O pokemon exibido na Pokedex deve conter um link nav', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonLink = getByText(/more details/i);
  expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
});

test('Pokemons favoritados devem exibir ícone de uma estrela', () => {
  const { getByText, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByText(/pokémon favoritado/i));
  const favoritePokemon = getByAltText(/Pikachu is marked as favorite/i);
  expect(favoritePokemon).toBeInTheDocument();
  expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
});
