import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test the <About.js /> component', () => {
  it('Test whether the page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Test if the page contains a Pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
