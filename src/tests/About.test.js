import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test component About', () => {
  it('Test if the page contains a heading (h2) with the text About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText(/About Pokédex/);
    expect(about).toBeInTheDocument();
  });

  it('Test if the page contains two paragraphs with text about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraphOne = getByText(/This application/i);
    const paragraphTwo = getByText(/One can filter/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Test if the page contains a image about Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const img = getByAltText(/Pokédex/);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
