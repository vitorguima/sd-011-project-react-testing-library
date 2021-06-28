import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import About from '../components/About';

describe('Testing About component', () => {
  it('test if `About Pokedéx` is in the screen', () => {
    const { getByText } = render(<About />);
    expect(getByText(/about pokédex/i)).toBeInTheDocument();
  });

  it('test if screen have a h2 title', () => {
    const { container } = render(<About />);
    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();
  });

  it('test if screen have 2 paragraphs', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('test if screen have an image', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
