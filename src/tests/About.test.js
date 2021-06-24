import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente About', () => {
  it('A page contém infos sobre a pokédex?', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText(/About Pokédex/);
    expect(about).toBeInTheDocument();
  });

  it('A page contém um título <h2> About Pokédex?', () => {
    const { getByTestId, getByText } = renderWithRouter(<About />);
    const aboutTitle = getByTestId(/h2-title/);
    expect(aboutTitle).toBeInTheDocument();
    const title = getByText(/About Pokédex/);
    expect(title).toBeInTheDocument();
  });

  it('A page contém dois parágrafos descritivos?', () => {
    const { getByTestId } = renderWithRouter(<About />);
    const aboutParagraphOne = getByTestId(/about-descrition-one/);
    expect(aboutParagraphOne).toBeInTheDocument();
    const aboutParagraphTwo = getByTestId(/about-descrition-two/);
    expect(aboutParagraphTwo).toBeInTheDocument();
  });

  it('A page contém uma imagem de pokédex?', () => {
    const { getByAltText, getByRole } = renderWithRouter(<About />);
    const aboutImage = getByAltText(/Pokédex/);
    expect(aboutImage).toBeInTheDocument();
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
