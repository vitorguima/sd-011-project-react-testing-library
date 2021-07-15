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
