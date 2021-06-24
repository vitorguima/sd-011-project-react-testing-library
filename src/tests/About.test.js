import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testes do componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const pkdxInfo1 = getByText(/This application simulates a Pokédex/i);
    const pkdxInfo2 = getByText(/a digital encyclopedia containing all Pokémons/i);
    const pkdxInfo3 = getByText(/One can filter Pokémons by type, and see more/i);
    const pkdxInfo4 = getByText(/details for each one of them/i);

    expect(pkdxInfo1).toBeInTheDocument();
    expect(pkdxInfo2).toBeInTheDocument();
    expect(pkdxInfo3).toBeInTheDocument();
    expect(pkdxInfo4).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const aboutH2 = getByRole('heading', { level: 2 });
    // const aboutH2 = getByRole('heading', { level: 2, name: 'About Pokédex'});
    expect(aboutH2).toHaveTextContent(/About Pokédex/i);
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const paragraphInfo1 = getByText(/This application simulates a Pokédex/i);
    const paragraphInfo2 = getByText(/a digital encyclopedia containing all Pokémons/i);
    expect(paragraphInfo1).toBeInTheDocument();
    expect(paragraphInfo2).toBeInTheDocument();
  });
  test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const aboutImgURL = ('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    const aboutImg = getByRole('img');
    expect(aboutImg.src).toBe(aboutImgURL);
  });
});
