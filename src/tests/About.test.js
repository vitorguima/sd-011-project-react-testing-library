import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

test('test if page contains info about pokedex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const h2IChooseYou = screen.getByRole('heading', { level: 2 });
  expect(h2IChooseYou).toBeInTheDocument();
});

test('test if about contais Pokedex text', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const text = screen.getByText('About Pokédex');
  expect(text).toBeInTheDocument();
});

test('test if about contais 2 paragraphs about the pokedex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const p1 = screen.getByText('This application simulates a Pokédex,'
   + ' a digital encyclopedia containing all Pokémons');
  const p2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
});

test('test if about contais an pokedex Image', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imgTag = screen.getByRole('img');
  expect(imgTag.src).toBe(img);
});
