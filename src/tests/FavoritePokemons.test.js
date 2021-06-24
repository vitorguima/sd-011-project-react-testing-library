import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkFavorite = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    let moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    let favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const HomeButton = getByText('Home');
    fireEvent.click(HomeButton);
    const fireButton = getByText('Fire');
    fireEvent.click(fireButton);
    moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const linkFavorite = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);
    expect(getByText('Charmander')).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
