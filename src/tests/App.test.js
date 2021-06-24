import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

Describe('Teste o componente <App.js />', () => {
  it('Verifica se a primeira página carregada é a URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
    expect(getByText('Favorite Pokémons')).toBeTruthy();
  });
});
