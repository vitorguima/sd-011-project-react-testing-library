import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { container } = render(<About />);
    const h2 = container.querySelector('h2');
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('About Pokédex');
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const findInFistP = getByText(/a digital encyclopedia containing/i);
    const findInSecondP = getByText(/see more details for each one of them/i);
    expect(findInFistP).toBeInTheDocument();
    expect(findInSecondP).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { container } = render(<About />);
    const pokedexImage = container.querySelector('img');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
