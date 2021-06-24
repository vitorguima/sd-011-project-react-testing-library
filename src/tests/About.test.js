import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Test the About requirements', () => {
  test('Test if the page contains information "about Pokédex"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/about/i));

    expect(screen.getByText(/about pokédex/i)).toBeInTheDocument();
  });

  test('Test if the page contains two paragraphs with text "about Pokédex"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/about/i));

    expect(screen.getByText(/this application simulates a pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  test('Test if the page contains the image of a Pokédex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/about/i));

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImage.src).toBe(imageSrc);
  });
});
