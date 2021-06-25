import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('When render About', () => {
  it('The title is h2 wiht "About Pokedex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const typeText = getByRole('heading', { level: 2 });
    expect(typeText.innerHTML).toBe('About Pokédex');
  });
  it('Have 2 paragraphs whith text', () => {
    const { getByText } = renderWithRouter(<About />);
    const textOne = 'This application simulates a Pokédex, a '
    + 'digital encyclopedia containing all Pokémons';
    const textTwo = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';
    const paragraphOne = getByText(textOne);
    const paragraphTwo = getByText(textTwo);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Have a image whit link', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagePokemon = getByRole('img');
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/'
    + 'thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
