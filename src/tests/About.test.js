import React from 'react';

import renderWithMemory from '../renderWithMemory';
import App from '../App';

const initialEntries = { initialEntries: ['/about'] };
let getByText;
let container;

beforeEach(() => {
  ({ getByText, container } = renderWithMemory(<App />, initialEntries));
});

test('Test title h2 in about', () => {
  const h2 = getByText('About Pokédex');
  expect(h2).toContainHTML('<h2>About Pokédex</h2>');
});

test('Test pokédex descriptions', () => {
  const p1 = getByText(/This application simulates a Pokédex/i);
  const p2 = getByText(/One can filter Pokémons by type/i);

  expect(p1).toBeInTheDocument();
  expect(p1.localName).toBe('p');

  expect(p2).toBeInTheDocument();
  expect(p2.localName).toBe('p');
});

test('Test image pokédex', () => {
  const img = container.querySelector('img');
  expect(img).toContainHTML('<img class="pokedex-image" src="https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png" alt="Pokédex">');
});
