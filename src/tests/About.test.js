import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

test('testa se tem info sobre pokedex', () => {
  const { getByText } = render(<About />);
  const texto = getByText(/About Pokédex/i);
  expect(texto).toBeInTheDocument();
});

test('testa se existe section com texto', () => {
  const { getByRole } = render(<About />);
  const h2 = getByRole('heading', { level: 2 }); // pega o heading de nivel 2= h2
  expect(h2.innerHTML).toMatch(/About Pokédex/i); // toMaatch usado na aula  5.2
});

test('testa quantidade de paragrafos', () => {
  const { container } = render(<About />);
  const paragrafo = container.querySelectorAll('p');
  // console.log(paragrafo, paragrafo.length);
  // https://testing-library.com/docs/react-testing-library/api#container
  expect(paragrafo.length).toBe(2);
});

test('testa se existe uma imagem corresponde', () => {
  const { getByRole } = render(<About />);
  const Url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = getByRole('img', { alt: 'Pokédex' });
  expect(img.src).toContain(Url);
});
