import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do componente FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = render(<FavoritePokemons />);
    const favPkmText = getByText(/No favorite pokemon found/);
    expect(favPkmText).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/Normal/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/Fire/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const count = 3;
    const list = getAllByTestId('pokemon-name');
    expect(list.length).toBe(count);
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/Normal/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(queryByText('Rapidash')).not.toBeInTheDocument();
    expect(queryByText('Caterpie')).not.toBeInTheDocument();
    expect(queryByText('Ekans')).not.toBeInTheDocument();
  });
});
