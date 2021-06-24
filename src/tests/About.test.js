import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testing component About', () => {
  it('If the pages about have info about pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutTitle = getByRole('heading', { level: 2 });
    expect(aboutTitle.textContent).toBe('About Pokédex');
  });

  it('If the pages have 2 paragraph with the correct text', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOne = getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i);
    const paragraphOneText = paragraphOne.textContent;
    const paragraphTwo = getByText(/One can filter Pokémons by type, and see more details for each one of them/i);
    const paragraphTwoText = paragraphTwo.textContent;
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphOne.textContent).toBe(paragraphOneText);
    expect(paragraphTwo).toBeInTheDocument();
    expect(paragraphTwo.textContent).toBe(paragraphTwoText);
  });

  it('If the pages have a image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutImage = getByRole('img');
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImage).toHaveAttribute('alt', 'Pokédex');
    expect(aboutImage).toBeInTheDocument();
  });
});
