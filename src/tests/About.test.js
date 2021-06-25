import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('the page has h2 header', () => {
  const { getByText } = render(<About />);
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('page contains two paragraphs with text about Pokédex.', () => {
  const { getByText } = render(<About />);
  const paragraph1 = getByText(/This application simulates/i);
  const paragraph2 = getByText(/One can filter/i);
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('page contains the following image of a Pokédex', () => {
  render(<About />);
  expect(screen.getByAltText('Pokédex'))
    .toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
});
