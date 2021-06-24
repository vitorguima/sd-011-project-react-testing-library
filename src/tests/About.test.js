import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const pokedexInfo = getByText(/About Pokédex/i);
  expect(pokedexInfo).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const pokedexInfoH2 = getByText(/About Pokédex/i, { selector: 'h2' });
  expect(pokedexInfoH2).toBeInTheDocument();
});

describe('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  test('Parágrafo 1', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexParagraph1 = getByText(
      /This application simulates a Pokédex,/,
      /a digital encyclopedia/,
      /containing all Pokémons/,
    );
    expect(pokedexParagraph1).toBeInTheDocument();
  });

  test('Parágrafo 2', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexParagraph2 = getByText(
      /One can filter Pokémons by type,/,
      /and see more details for each one of them/,
    );
    expect(pokedexParagraph2).toBeInTheDocument();
  });
});

test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  const { getByRole } = renderWithRouter(<About />);
  const pokedexImage = getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
  expect(pokedexImage).toBeInTheDocument();
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
