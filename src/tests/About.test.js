import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('test the Component <About />', () => {
  it('has a heading h2 with the text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutTitle = getByRole('heading', { level: 2 });
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle).toHaveTextContent('About Pokédex');
  });

  it('has 2 paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates/i);
    const paragraph2 = getByText(/One can filter Pokémons/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('renders the image of a pokedex with the alt text "Pokédex"', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const aboutImage = getByAltText('Pokédex');
    expect(aboutImage).toBeInTheDocument();
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(aboutImage.src).toBe(src);
  });
});
