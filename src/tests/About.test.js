import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Tests of About component', () => {
  test('Testing if page contains text About Pokédex ', () => {
    const { getByText } = render(<About />);
    const h2 = getByText(/About Pokédex/);
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('About Pokédex');
  });
  test('test if theres 2 <p> about pokemon', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(2);
  });
  test('test if page contains img https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { container } = render(<About />);
    const image = container.querySelector('.pokedex-image');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
