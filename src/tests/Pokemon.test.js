// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/
// https://app.betrybe.com/course/live-lectures/sd-cohort-8#aula-153-rtl-testando-react-router
// https://testing-library.com/docs/queries/about/
// https://testing-library.com/docs/queries/byalttext/
// Baseado nos requisitos 2, 3 e 4
// Requisito feito junto com o colega Nikolas Silva

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName.innerHTML).toBe(pokemons[0].name);
  const pokeType = getByTestId('pokemon-type');
  expect(pokeType.innerHTML).toBe(pokemons[0].type);
  const pokeWeight = getByTestId('pokemon-weight');
  expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  const pokeImg = getByAltText(`${pokeName.innerHTML} sprite`);
  expect(pokeImg).toHaveAttribute('src', pokemons[0].image);
});

test('Testa se o card contém um link para detalhes', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkDetails = getByText('More details');
  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
});

test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getByLabelText, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const favoritedPoke = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoritedPoke);
  const starIcon = getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
