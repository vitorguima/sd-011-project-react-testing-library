import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favorites = getByText('No favorite pokemon found');
    expect(favorites).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  // test('Deve exibir na tela a mensagem No favorite pokemon found', () => {
  //   const { getByText, history } = renderWithRouter(<FavoritePokemons />);
  //   history.push('/pagina/que-nao-existe/');
  //   const noMatch = getByText(/not found/i);
  //   expect(noMatch).toBeInTheDocument();
  // });
});
