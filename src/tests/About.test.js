import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test About component', () => {
  it('Checks if the page has info about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/);
    expect(heading).toBeInTheDocument();
  });

  it('Checks if the page has an h2 with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 }, { name: /About Pokédex/ });
    expect(heading).toBeInTheDocument();
  });

  it('Checks if the page has two paragraphs with the text Pokédex.', () => {
    const { container } = renderWithRouter(<About />); // https://testing-library.com/docs/example-reach-router/
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2); // toHaveLength tb funciona
  });

  it('Checks if the page has an image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
