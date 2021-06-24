import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Test the About Component', () => {
  it('Test if the page contains informations abour Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/);
    expect(firstParagraph).toBeInTheDocument();
  });

  it('Test if the page contains a heading H2 with the text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingH2 = getByRole('heading', { level: 2 });
    expect(headingH2).toHaveTextContent(/About Pokédex/);
  });

  it('Test if the page contains 2 paragraphs about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/This application simulates a Pokédex/)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type/)).toBeInTheDocument();
  });

  it('Test if the page contains an image of a Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText(/Pokédex/)).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
