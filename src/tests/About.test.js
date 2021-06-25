import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

const expectedAboutPageTitle = 'About Pokédex';
const expectedImageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('About.js:', () => {
  it('The page must contain the heading \'About Pokédex\'.', () => {
    const { getByText } = render(<About />);
    const aboutPageTitle = getByText(expectedAboutPageTitle);

    expect(aboutPageTitle).toBeInTheDocument();
    expect(aboutPageTitle.textContent).toBe(expectedAboutPageTitle);
  });

  it('The page must contain two paragraphs about the Pokédex.', () => {
    const { getByText } = render(<About />);
    const paragraphs = [
      getByText(/this application/i),
      getByText(/one can filter/i),
    ];

    paragraphs.forEach((paragraph) => {
      expect(paragraph).toBeInTheDocument();
    });
    expect(paragraphs.length).toBe(2);
  });

  it('The page must contain a pokedéx image.', () => {
    const { getByRole } = render(<About />);
    const pokedexImage = getByRole('img', { name: /pokédex/i });

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toBe(expectedImageSource);
  });
});
