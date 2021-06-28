import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('About.js component', () => {
  it('should show information about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutElement = getByText(/About Pokédex/i);
    expect(aboutElement).toBeVisible();
  });

  it('should have two paragraphs of text', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  it('should have the image of a pokedex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imgElement = getByAltText(/Pokédex/i);
    expect(imgElement.getAttribute('src')).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
