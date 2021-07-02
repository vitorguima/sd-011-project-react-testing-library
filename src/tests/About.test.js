import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe(' Testes do componente About', () => {
  // https://www.w3.org/TR/html-aria/#allowed-descendants-of-aria-roles (heading das tags <h>)
  // https://testing-library.com/docs/queries/byrole#level (level)
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByRole } = render(<About />);
    const subtitle = getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent(/About Pokédex/i);
  });

  // https://testing-library.com/docs/react-testing-library/api/#queries (containers)
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Element/querySelectorAll (querySelectorAll)
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex..', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('Teste se a página contém a seguinte URL de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');

    expect(img.src).toContain(URL);
  });
});
