import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const aboutLinkClick = () => {
  fireEvent.click(screen.getByRole('link', { name: 'About' }));
};

describe('About component tests', () => {
  it('should render a heading with "About Pokédex" text', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    aboutLinkClick();

    expect(screen.getByText(/about pokédex/i)).toBeInTheDocument();
  });

  it('should have two paragraphs with text about the pokédex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    aboutLinkClick();

    expect(screen.getByText(/this application simulates a pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  it('should have a pokédex image', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    aboutLinkClick();

    const pokedexImage = screen.getByRole('img');
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImage.src).toBe(imageSrc);
  });
});
