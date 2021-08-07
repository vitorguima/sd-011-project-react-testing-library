import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('2 - Teste o componente <About.js /.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    // Testa o título
    const { getByText, getByAltText } = renderWithRouter(<About />);
    const aboutTitle = getByText(/About Pokédex/);
    expect(aboutTitle).toBeInTheDocument();
    // Testa os dois parágrafos
    let text = /This application simulates a Pokédex, a digital encyclopedia/;
    const paragraph1 = getByText(text);
    expect(paragraph1).toBeInTheDocument();
    text = /One can filter Pokémons by type, and see more details for each one of them/;
    const paragraph2 = getByText(text);
    expect(paragraph2).toBeInTheDocument();
    // Testa a imagem
    const image = getByAltText('Pokédex');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(src);
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    let text = /This application simulates a Pokédex, a digital encyclopedia/;
    const paragraph1 = getByText(text);
    expect(paragraph1).toBeInTheDocument();
    text = /One can filter Pokémons by type, and see more details for each one of them/;
    const paragraph2 = getByText(text);
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte um imagem da Pokédex:', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(src);
  });
});
