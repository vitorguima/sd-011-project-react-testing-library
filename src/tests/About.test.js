import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Test battery for the About component', () => {
  test('Checks if the page contains a heading h2 with the text About Pokédex.', () => {
    renderWithRouter(<About />);

    const getByText = screen.getByText(/about pokédex/i);
    expect(getByText).toBeInTheDocument();
  });

  test('Check if the page contains two paragraphs with text about Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const tagParagraph = container.querySelectorAll('p');
    const numberOfParagraphExpected = 2;

    expect(tagParagraph.length).toBe(numberOfParagraphExpected);
    expect(tagParagraph[0].textContent.length).toBeGreaterThan(0);
    expect(tagParagraph[1].textContent.length).toBeGreaterThan(0);
  });

  test('Checks if the page contains a specific image of a Pokédex', () => {
    renderWithRouter(<About />);

    const imageOfPokedex = screen.getByAltText('Pokédex');
    expect(imageOfPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
