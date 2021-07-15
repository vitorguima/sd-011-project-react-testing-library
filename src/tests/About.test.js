import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Testing About Component', () => {
  it('test pokedex info', () => {
    const { getByRole } = render(<About />);
    const subtitle = getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent(/About Pokédex/i);
  });
  it('test pokedex text', () => {
    const { container } = render(<About />);
    const line = container.querySelectorAll('p');
    expect(line.length).toBe(2);
  });
  it('test pokedex URL', () => {
    const { getByRole } = render(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toContain(URL);
  });
});
