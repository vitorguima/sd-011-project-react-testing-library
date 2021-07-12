import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

it('Verifica se contem uma tag h2 com o texto About Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  const h2 = getByText(/About Pokédex/);
  expect(h2).toBeInTheDocument();
});

it('Verifica se contem 2 paragrafos na pagina', () => {
  const { container } = renderWithRouter(<About />);
  const paragraph = container.querySelectorAll('p');

  expect(paragraph.length).toBe(2);
});

it('Verifica se a imagem correta está no arquivo', () => {
  const { getByRole } = renderWithRouter(<About />);

  const img = getByRole('img');
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
