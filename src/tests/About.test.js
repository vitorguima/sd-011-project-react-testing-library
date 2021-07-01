import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('page contains information about Pokédex', () => {
  const { getByText } = render(<About />);

  const informations = 'This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons';

  const informations2 = 'One can filter Pokémons by type, '
  + 'and see more details for each one of them';

  const pokedexInformations = getByText(informations);
  const pokedexInformations2 = getByText(informations2);

  expect(pokedexInformations).toBeInTheDocument();
  expect(pokedexInformations2).toBeInTheDocument();
});

test('contains `h2` with text `About Pokédex`', () => {
  const { getByText } = render(<About />);

  const titleAbout = getByText(/About Pokédex/);

  expect(titleAbout).toBeInTheDocument();
});

test('image with correct URL', () => {
  const { getByAltText } = render(<About />);

  const image = getByAltText(/Pokédex/i);
  const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(image).toHaveAttribute('src', imageUrl);
});
