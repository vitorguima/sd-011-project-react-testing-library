import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Check the functions of page about', () => {
  it('test if page contain information about pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const information = getByText(/about pokédex/i);
    expect(information).toBeInTheDocument();
  });

  it('Check the two paragraphs on the page with the texts', () => {
    const { getByText, container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');

    const firstParagraph = getByText(/One can filter Pokémons by type/i);
    const secondParagraph = getByText(/this application simulates a Pokédex/i);

    expect(paragraphs.length).toBe(2);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Check if page contain an image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
