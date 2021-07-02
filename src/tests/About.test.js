import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('if the heading has a h2 with the text "About Pokédex"', () => {
  const { getByText } = render(<About />);
  const heading = getByText('About Pokédex');

  expect(heading).toBeInTheDocument();
});

test('if the page has a image with expected source', () => {
  const { getByAltText } = render(<About />);
  const image = getByAltText('Pokédex');

  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
