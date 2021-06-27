import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('tests the About component', () => {
  it('should render details on the Pokedex', () => {
    const { getByText } = render(<About />);
    const details1stParagraph = getByText(/This application simulates/);
    expect(details1stParagraph).toBeInTheDocument();
  });

  it('should render h2 with the text About Pokédex', () => {
    const { getByText } = render(<About />);
    const h2About = getByText(/About Pokédex/);
    expect(h2About).toBeInTheDocument();
  });

  it('should have two paragraphs with info on the Pokedex', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/);
    paragraphs.map((item) => expect(item).toBeInTheDocument());
  });

  it('should render a specific picture', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
