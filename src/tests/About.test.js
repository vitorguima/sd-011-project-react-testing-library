import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

// describe('Teste o componente <About.js />', () => {
test('se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = render(<About />);
  const aboutPokédex = getByText(/a digital encyclopedia containing all Pokémons/i);
  expect(aboutPokédex).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText, getByRole } = render(<About />);
  const heading = getByRole(/heading/);
  const headingInfos = getByText(/About Pokédex/i);
  expect(headingInfos).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
});

test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const paragraphOne = getByText(
    /This application simulates a Pokédex, /,
    /a digital encyclopedia containing all Pokémons/,
  );
  const paragraphTwo = getByText(
    /One can filter Pokémons by type, and see more details for each one of them/,
  );
  expect(paragraphOne).toBeInTheDocument();
  expect(paragraphTwo).toBeInTheDocument();
});

test('se a página contém a seguinte imagem de uma Pokédex', () => {
  const { getByAltText } = render(<About />);
  const image = getByAltText(/Pokédex/);
  expect(image.src).toContain(
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
// });
