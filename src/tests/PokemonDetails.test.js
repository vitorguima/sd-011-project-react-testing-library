import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a card with pokemon information', () => {
  const { getByTestId, getAllByText, getByText, getByAltText, getByRole } = render(
    <MemoryRouter initialEntries={ ['/pokemons/25'] }>
      <App />
    </MemoryRouter>,
  );
  const pikachuName = getByTestId('pokemon-name');
  expect(pikachuName).toBeInTheDocument();
  // const pikachuType = getByTestId('pokemon-type');
  // expect(pikachuType).toBeInTheDocument();
  // const pikachuWeight = getByTestId('pokemon-weight');
  // expect(pikachuWeight).toBeInTheDocument();
  // const pikachuNameTimes = getAllByText(/Pikachu/i);
  // const length = 3;
  // expect(pikachuNameTimes.length).toBe(length);
  // const type = getByText(/Electric/);
  // expect(type).toBeInTheDocument();
  // const avgWeight = getByText(/Average weight: 6.0 kg/);
  // expect(avgWeight).toBeInTheDocument();
  // const img = getByAltText(/Pikachu sprite/);
  // const { src, alt } = img;
  // expect(src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  // expect(alt).toMatch('Pikachu sprite');
  // const h2 = getByRole('heading', { level: 2 });
  // expect(h2).toBeInTheDocument();
  // const summary = getByText(/This intelligent Pokémon roasts hard berries with/,
  //   / electricity to make them tender enough to eat./);
  // expect(summary).toBeInTheDocument();
});

// test('renders the correct path and pokemon details', () => {
//   const { getByText,
//     getByTestId, getAllByText, getByAltText, history } = renderWithRouter(<App />);
//   const linkDetails = getByText(/More details/);
//   fireEvent.click(linkDetails);
//   const url = history.location.pathname;
//   expect(url).toBe('/pokemons/25');
//   const pikachuName = getByTestId('pokemon-name');
//   expect(pikachuName).toBeInTheDocument();
//   const pikachuType = getByTestId('pokemon-type');
//   expect(pikachuType).toBeInTheDocument();
//   const pikachuWeight = getByTestId('pokemon-weight');
//   expect(pikachuWeight).toBeInTheDocument();
//   const pikachuNameTimes = getAllByText(/Pikachu/i);
//   const length = 3;
//   expect(pikachuNameTimes.length).toBe(length);
//   const type = getByText(/Electric/);
//   expect(type).toBeInTheDocument();
//   const avgWeight = getByText(/Average weight: 6.0 kg/);
//   expect(avgWeight).toBeInTheDocument();
//   const img = getByAltText(/Pikachu sprite/);
//   const { src, alt } = img;
//   expect(src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
//   expect(alt).toMatch('Pikachu sprite');
// });
