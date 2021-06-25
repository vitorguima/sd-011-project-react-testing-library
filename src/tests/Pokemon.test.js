import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a card with pokemon information', () => {
  const { getByTestId, getAllByText, getByText, getByAltText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const pikachuName = getByTestId('pokemon-name');
  expect(pikachuName).toBeInTheDocument();
  const pikachuType = getByTestId('pokemon-type');
  expect(pikachuType).toBeInTheDocument();
  const pikachuWeight = getByTestId('pokemon-weight');
  expect(pikachuWeight).toBeInTheDocument();
  const pikachuName2 = getByText(/Pikachu/);
  expect(pikachuName2).toBeInTheDocument();
  const type1 = getAllByText(/Electric/i);
  expect(type1.length).toBe(2);
  const avgWeight = getByText(/Average weight: 6.0 kg/);
  expect(avgWeight).toBeInTheDocument();
  const img = getByAltText(/Pikachu sprite/);
  const { src, alt } = img;
  expect(src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(alt).toMatch('Pikachu sprite');
});

test('tests the More Details link', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/);
  expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
});

test('goes to correct path - pokemon details', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/);
  fireEvent.click(linkDetails);
  const url = history.location.pathname;
  expect(url).toBe('/pokemons/25');
});

test('have a star on favourite pokemons', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/);
  fireEvent.click(linkDetails);
  const checkBox = getByText(/Pokémon favoritado/);
  fireEvent.click(checkBox);
  const linkHome = getByText(/Home/);
  fireEvent.click(linkHome);
  const star = getByAltText(/Pikachu is marked as favorite/);
  expect(star).toBeInTheDocument();
  const { src, alt } = star;
  expect(src).toContain('/star-icon.svg');
  expect(alt).toMatch('Pikachu is marked as favorite');
});

// test('renders the correct path and pokemon details', () => {
//   const { getByText,
//     getByTestId, getAllByText, getByAltText, history } = renderWithRouter(<App />);
//   const linkDetails = getByText(/More details/);
//   fireEvent.click(linkDetails);
//   const url = history.location.pathname;
//   expect(url).toBe('/pokemons/25');
// const pikachuName = getByTestId('pokemon-name');
// expect(pikachuName).toBeInTheDocument();
// const pikachuType = getByTestId('pokemon-type');
// expect(pikachuType).toBeInTheDocument();
// const pikachuWeight = getByTestId('pokemon-weight');
// expect(pikachuWeight).toBeInTheDocument();
// const length = 2;
// const type = getAllByText(/Electric/);
// expect(type.length).toBe(length);
// const avgWeight = getByText(/Average weight: 6.0 kg/);
// expect(avgWeight).toBeInTheDocument();
// const img = getByAltText(/Pikachu sprite/);
// const { src, alt } = img;
// expect(src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
// expect(alt).toMatch('Pikachu sprite');
// });
