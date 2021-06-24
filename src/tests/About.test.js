import React from 'react';
import About from '../components/About';
import renderWithRouter from '../RenderWithRouter';

describe('tests About component', () => {
  it('check if there is an h2 with the text `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutHeader = getByText('About Pokédex');
    expect(aboutHeader).toBeInTheDocument();
  });

  it('renders a reading with two paragraphs about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const getFirstParagraph = getByText(/This application simulates a Pokédex/i);
    expect(getFirstParagraph).toBeInTheDocument();
    const getSecondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(getSecondParagraph).toBeInTheDocument();
  });

  it('check if there is an image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const logo = getByRole('img');
    const logoSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(logo).toHaveAttribute('src', logoSource);
    expect(logo).toHaveAttribute('alt', 'Pokédex');
  });
});
