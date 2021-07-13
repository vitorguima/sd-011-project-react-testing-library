import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Test all App component', () => {
  test('if renders `About` component with Heading `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  test('if `About` component contains 2 paragraphs about the application', () => {
    const { getAllByTestId } = renderWithRouter(<About />);

    const paragraphs = getAllByTestId('paragraph');
    const { length } = paragraphs;

    expect(paragraphs).toHaveLength(length);
    paragraphs.forEach((paragraph) => {
      expect(paragraph.tagName).toBe('P');
    });
  });

  test('if `About` component contain a Pokédex image', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
