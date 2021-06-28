import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o requisito 03: ', () => {
  test('Se não tiver pokémons favoritos aparece "No favorite pokemon found"', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();

    // Ao renderizar a página vazia, deve aparecer a mensagem de nenhum pokémon encontrado.
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    // const buttons = getAllByTestId('pokemon-type-button');
    // fireEvent.click(buttons);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/Favorite Pokémons/));
    expect(getByText(/kg/)).toBeInTheDocument();
  });

  test('Se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    // const { getByText } = renderWithRouter(<App />);
    // fireEvent.click(getByText(/Favorite Pokémons/));

    // const weight = getByText(/Average weight/i);
    // expect(weight).toBeInTheDocument();
  });
});
