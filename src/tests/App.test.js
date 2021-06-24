import React from 'react';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithMemory from '../renderWithMemory';
// import renderWithRouter from '../renderWithRouter';

import App from '../App';

const matches = ['/', 'about', 'favorites'];
const links = ['Home', 'About', 'Favorite Pokémons'];
const texts = [
  'Encountered pokémons',
  'About Pokédex', 'Favorite pokémons',
  'Page requested not found',
];

test('Renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithMemory(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithMemory(<App />, { initialEntries: ['/'] });
  expect(getByText(texts[0])).toBeInTheDocument();
});

test('Shows the nav bar with Home, About and Favorite Pokémons', () => {
  const { getByText } = renderWithMemory(<App />);

  links.forEach((link, i) => {
    const match = matches[i];
    const re = new RegExp(match, 'i');
    expect(getByText(link).href).toMatch(re);
  });
});

test('Test when click on home', () => {
  const { getByText } = renderWithMemory(<App />, { initialEntries: ['/about'] });
  userEvent.click(getByText(links[0]));
  expect(getByText(texts[0])).toBeInTheDocument();
});

test('Test when click on about', () => {
  const { getByText } = renderWithMemory(<App />);
  userEvent.click(getByText(links[1]));
  expect(getByText(texts[1])).toBeInTheDocument();
});

test('Test when click on favorites', () => {
  const { getByText } = renderWithMemory(<App />);
  userEvent.click(getByText(links[2]));
  expect(getByText(texts[2])).toBeInTheDocument();
});

test('Test on link not exists', () => {
  const { getByText } = renderWithMemory(<App />, { initialEntries: ['/not-exists'] });
  expect(getByText(texts[3])).toBeInTheDocument();
});
