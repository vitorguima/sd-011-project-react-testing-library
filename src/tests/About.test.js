import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Test About component', () => {
  it('Check if the page contains a h2 heading, with /About Pokedex/ text', () => {
    const { container } = render(<About />);
    const element = container.querySelector('h2');
    expect(element.textContent).toBe('About Pokédex');
  });

  it('Check if the page contais two paragrafs with about Pokedex text', () => {
    const { container } = render(<About />);
    const element = container.querySelectorAll('p');
    expect(element.length).toBe(2);
  });

  it('Check if the page contains Pokedex devices image.', () => {
    const { container } = render(<About />);
    const element = container.querySelector('img');
    expect(element.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
