import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderRouter from '../renderRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    // Acessar os elementos da tela
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    // Fazer o teste
    expect(message).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    // Acessar os elementos da tela
    const { history, getByRole } = renderRouter(<App />);
    history.push('/pokemons/25');
    const favoritePikachu = getByRole('checkbox');
    // Interagir com a aplicação
    fireEvent.click(favoritePikachu);
    // Fazer o teste
    expect(favoritePikachu.checked).toEqual(true);
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    // Acessar os elementos da tela
    const { queryByText } = render(<FavoritePokemons />);
    const pikachu = queryByText(/pikachu/i);
    // Fazer o teste
    expect(pikachu).not.toBeInTheDocument();
  });
});
