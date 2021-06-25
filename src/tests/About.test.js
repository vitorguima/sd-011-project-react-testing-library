import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2', () => {
  it('A página deve conter as informações sobre a Pokédex.',
    () => {
      const { container } = renderWithRouter(<App />, { route: '/about' });
      const section = container.querySelectorAll('section');
      expect(section.length).toBe(2);
    });

  it('A página deve conter um heading h2 com o texto About Pokédex.',
    () => {
      const { container } = renderWithRouter(<App />, { route: '/about' });
      const h2 = container.querySelector('h2');
      expect(h2.textContent).toBe('About Pokédex');
    });

  it('A página deve conter  dois parágrafos com texto sobre a Pokédex.',
    () => {
      const { container } = renderWithRouter(<App />, { route: '/about' });
      const p = container.querySelectorAll('p');
      expect(p.length).toBe(2);
      expect(p[0].textContent).toContain('This application simulates a Pokédex');
      expect(p[1].textContent).toContain('One can filter Pokémons by type');
    });

  it(`A página deve conter a seguinte imagem de uma Pokédex: 
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`,
  () => {
    const { container } = renderWithRouter(<App />, { route: '/about' });
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
