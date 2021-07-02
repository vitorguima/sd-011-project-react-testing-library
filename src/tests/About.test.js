import React from 'react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Renders About component with information about Pokédex', () => {
  it('renders a header with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const header = getByRole('heading', { level: 2 });

    expect(header).toHaveTextContent('About Pokédex');
  });

  it('Test if the page contains two paragraphs with text on a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOne = getByText(/simulates a Pokédex/i);
    const paragraphTwo = getByText(/filter Pokémons/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Test the existence of a Pokédex image on the page', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgPokedex = getByRole('img');

    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
