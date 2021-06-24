import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

it('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutTitle = getByText(/About Pokédex/i);
  expect(aboutTitle).toBeInTheDocument();
});

it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  const { container } = renderWithRouter(<About />);
  const h2 = container.querySelector('h2');
  expect(h2).toHaveTextContent(/About Pokédex/);
});

it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { container } = renderWithRouter(<About />);
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs).toHaveLength(2);
});

it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const image = container.querySelector('img');
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
