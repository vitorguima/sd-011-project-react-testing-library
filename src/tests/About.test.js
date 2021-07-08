import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('testing About Page', () => {
  it('testing if About Page have information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const infoAbout = getByText(/About Pokédex/i);
    expect(infoAbout).toBeInTheDocument();
  });

  it('testing if the heading "About Pokédex" is h2', () => {
    const { getByRole, getByText } = renderWithRouter(<About />);
    const checkTitle = getByRole('heading', { level: 2 });
    const title = getByText(/About Pokédex/i);
    expect(checkTitle).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(checkTitle.innerHTML).toMatch('About Pokédex');
  });

  it('testing if the Page has 2 paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstPar = getByText(/This application simulates a Pokédex/i);
    const secondPar = getByText(/One can filter Pokémons by type/i);
    expect(firstPar).toBeInTheDocument();
    expect(secondPar).toBeInTheDocument();
  });

  it('testing if there is a specific image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
