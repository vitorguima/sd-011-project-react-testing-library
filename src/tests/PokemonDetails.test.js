import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

const entrie = '/pokemons/25';
test('renders a card with selected pokemon information', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ [entrie] }>
      <App />
    </MemoryRouter>,
  );
  const pikachuNameDetails = getByText(/Pikachu Details/);
  expect(pikachuNameDetails).toBeInTheDocument();
  const allLinks = document.querySelectorAll('.link');
  const expectedLenght = 3;
  expect(allLinks.length).toBe(expectedLenght);
  const summaryH2 = getByText(/Summary/);
  expect(summaryH2.innerHTML).toBe('Summary');
  const detailsText = getByText(/This intelligent Pokémon roasts hard/,
    /berries with electricity to make them tender enough to eat./);
  expect(detailsText).toBeInTheDocument();
});

test('renders a section with pokemon location maps', () => {
  const { getByText, getAllByAltText } = render(
    <MemoryRouter initialEntries={ [entrie] }>
      <App />
    </MemoryRouter>,
  );
  const h2Maps = getByText(/Game Locations of Pikachu/);
  expect(h2Maps.innerHTML).toBe('Game Locations of Pikachu');
  const mapImages = getAllByAltText(/Pikachu location/);
  expect(mapImages.length).toBe(2);
  expect(mapImages[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapImages[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  const location1 = getByText(/Kanto Viridian Forest/);
  const location2 = getByText(/Kanto Power Plant/);
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();
});

test('pokemon goes to favorites section', () => {
  const { getByText, getByAltText } = render(
    <MemoryRouter initialEntries={ [entrie] }>
      <App />
    </MemoryRouter>,
  );
  const checkBox = getByText(/Pokémon favoritado/);
  fireEvent.click(checkBox);
  const star = getByAltText(/Pikachu is marked as favorite/);
  expect(star).toBeInTheDocument();
  const { src, alt } = star;
  expect(src).toContain('/star-icon.svg');
  expect(alt).toMatch('Pikachu is marked as favorite');
});
