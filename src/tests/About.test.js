import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe(' Teste o componente <About.js />', () => {
  it('se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(<About />);
    const header = getByText('About Pokédex');
    expect(header).toBeInTheDocument();
  });

  it('se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = render(<About />);
    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
