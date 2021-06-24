import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRoute';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 03', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const element = getByText(/No favorite pokemon found/i);
    expect(element).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const homePath = getByText(/Home/);
    fireEvent.click(homePath);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const favoritePath = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePath);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
