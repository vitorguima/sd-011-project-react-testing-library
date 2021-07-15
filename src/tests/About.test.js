import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('if page contains information about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);

  const infoPokedex = getByText(/About Pokédex/i);
  expect(infoPokedex).toBeInTheDocument();
});

test('if contains a h2 heading with about Pokedex text', () => {
  const { container } = renderWithRouter(<About />);

  const headerPokedex = container.querySelectorAll('h2');
  expect(headerPokedex.length).toBe(1);
});

test('if contains two paragraphs with text about Pokedex', () => {
  const { container } = renderWithRouter(<About />);
  const [paragraph] = container.getElementsByTagName('p');

  expect(paragraph).toBeInTheDocument();
});

test('if is the correct image URL', () => {
  const { container } = renderWithRouter(<About />);
  const [image] = container.getElementsByTagName('img');

  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
