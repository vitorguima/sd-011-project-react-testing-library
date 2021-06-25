import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test component About', () => {
  it('Test if the page have info about pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const infos = getByText(
      /One can filter Pokémons by type, and see more details for each one of them/,
    );
    expect(infos).toBeInTheDocument();
  });

  it('Verify if exist a H2 with text "about pokedex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const findH2 = getByRole('heading');
    expect(findH2).toHaveTextContent('About Pokédex');
  });

  it('Verify if exist 2 paragraphs in the document', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type, and see more/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Verify if the page have correct img', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
