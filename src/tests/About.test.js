import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Test the <About.js / component.', () => {
  test('Test if the page contains information about Pokédex', () => {
    const { getByText } = render(<About />);
    const informations = getByText(/About Pokédex/i);

    expect(informations).toBeInTheDocument();
  });

  test('Test if the page contains a heading h2 with the text About Pokédex', () => {
    const { container } = render(<About />);
    const getAbout = container.querySelector('h2');

    expect(getAbout.textContent).toBe('About Pokédex');
  });

  test('Test if the page contains two paragraphs with text about Pokédex.', () => {
    const { container } = render(<About />);
    const getP = container.querySelectorAll('p');

    expect(getP.length).toBe(2);
  });

  test('Test if the page contains the following image of a Pokédex.', () => {
    const { container } = render(<About />);
    const getImg = container.querySelector('.pokedex-image');

    expect(getImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
