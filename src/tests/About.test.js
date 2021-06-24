import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Verifies the About component', () => {
  it('renders a h2 with the text `About Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('renders 2 paragraphs', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const aboutPars = container.querySelectorAll('p');
    expect(aboutPars.length).toBe(2);
  });

  it('renders an image of the Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const pokedexImg = getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
