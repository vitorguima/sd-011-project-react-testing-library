import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { About } from '../components';

describe('requirement 2 - test the About.js component', () => {
  it('render about pokedex page', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('page contains a heading h2 with the text About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();
  });

  it('page contains two paragraphs with text about pokedex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  it('page contains the fallowing image off pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
