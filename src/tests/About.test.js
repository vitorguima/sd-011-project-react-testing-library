import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { container } = renderWithRouter(<App />, { route: '/about' });
    const pPokedex = container.querySelectorAll('p');
    expect(pPokedex.length).toBe(2);
    expect(pPokedex[0].textContent).toContain('This application simulates a Pokédex');
    expect(pPokedex[1].textContent).toContain('One can filter Pokémons by type');
  });

  it('página tem h2', () => {
    const { container } = renderWithRouter(<App />, { route: '/about' });
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('About Pokédex');
  });

  it('página tem img com src', () => {
    const { container } = renderWithRouter(<App />, { route: '/about' });
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
