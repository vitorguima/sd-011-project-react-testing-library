import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    // TODO Perguntar o que sao essas informações ??????
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole, getByText } = render(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    // TODO encontrar dois parágrafos, nao funciona getByRole.
    expect(getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type, and see more details for each one of them/)).toBeInTheDocument();
    // TODO arrumar strings muito grandes.
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole, getByText } = render(<About />);
    expect(getByRole('img')).toBeInTheDocument();
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(getByText(imageSrc)).toBeInTheDocument();
    // TODO Verificar pq nao encontra o src da imagem.
  });
});
