import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Testing the About component', () => {
  it('Should have the Pokedex information', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutFragment = /This application simulates a Pokédex/i;
    expect(getByText(aboutFragment)).toBeInTheDocument();
  });

  it('Should have a H2 element with specific text', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2Element = getByRole('heading');
    expect(h2Element).toHaveTextContent(/About Pokédex/i);
  });

  it('Should two <p> element with text', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstElement = getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i
    );
    const secondElement = getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i
    );
    expect(firstElement).toBeInTheDocument();
    expect(secondElement).toBeInTheDocument();
  });

  it('Should have an img element with specific src', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgElement = getByRole('img');
    const URL =
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgElement.src).toBe(URL);
  });
});
