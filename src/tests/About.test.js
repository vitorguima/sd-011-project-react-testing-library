import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('<About.js /> component testing', () => {
  it('contains informations about Pokedéx', () => {
    const { getByText } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('contains h2 heading with the text "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('contains two paragraphs with text about Pokédex', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('contains image of Pokédex', () => {
    const { container } = render(<About />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
