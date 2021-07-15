import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('Testa se as informações detalhadas do Pokémon são exibidas na tela.', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);

  const nameDetails = getByText(`${pokemons[0].name} Details`);
  expect(nameDetails).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();

  const detailsSection = getByRole('heading', {
    name: /Summary/i,
  });
  expect(detailsSection).toBeInTheDocument();

  const summary = getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(summary.innerHTML).toBe(pokemons[0].summary);
});

test('Testa se existe na página uma seção com os mapas', () => {
  const { container, getByText, getAllByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);

  const locationDetails = getByText(`Game Locations of ${pokemons[0].name}`);
  expect(locationDetails).toBeInTheDocument();

  const location = container.querySelector('em');
  expect(location.innerHTML).toBe('Kanto Viridian Forest');

  const imgDetails = getAllByAltText(`${pokemons[0].name} location`);
  expect(imgDetails[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgDetails[0]).toHaveAttribute('alt', `${pokemons[0].name} location`);
});
