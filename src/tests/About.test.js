import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

// it('', () => {});
// Consulta de matchers em https://jestjs.io/pt-BR/docs/expect

it('Testa se a página tem as informações da Pokédex', () => {
  const { getByText } = render(<About />);
  const info = getByText(/This application simulates a Pokédex/);
  expect(info).toBeInTheDocument();
});

it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  const { container } = render(<About />);
  const titleH2 = container.querySelector('h2');
  expect(titleH2).toHaveTextContent(/About Pokédex/);
});

it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { container } = render(<About />);
  const tagP = container.querySelectorAll('p');
  expect(tagP).toHaveLength(2);
});

// Consulta em https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
  const { container } = render(<About />);
  const img = container.querySelector('img');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
