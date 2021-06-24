import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = render(<About />);
  const titleH2 = getByRole('heading', { level: 2, name: /About Pokédex/i }); // elemento heading, nivel 2: h2, e o texto a ser procurado(name: value do heading)
  expect(titleH2).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = render(<About />);
  const findParagraph1 = getByText(/This application simulates a Pokédex/i);
  const findParagraph2 = getByText(/One can filter Pokémons by type/i);
  expect(findParagraph1).toBeInTheDocument();
  expect(findParagraph2).toBeInTheDocument();
});

test('Teste se a página contém a imagem de uma Pokédex', () => {
  const { getByAltText } = render(<About />);
  const findImage = getByAltText(/Pokédex/);
  expect(findImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
