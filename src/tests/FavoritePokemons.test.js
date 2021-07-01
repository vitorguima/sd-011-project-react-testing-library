import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWhithRouter from '../renderWithRouter';

describe('Requisito 03 Favorite Pokémons', () => {
  it('Deve conter a mensagem `No favorite pokemon found` ', () => {
    const { getByText } = render(<FavoritePokemons />);
    const textNotFound = getByText('No favorite pokemon found');
    expect(textNotFound).toBeInTheDocument();
  });

  it('Deve exibir todos os Pokémons favoritados', () => {
    const { getByText, getAllByTestId } = renderWhithRouter(<App />);
    let details = getByText('More details');
    fireEvent.click(details);
    let favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);

    const home = getByText('Home');
    fireEvent.click(home);
    const fire = getByText(/fire/i);
    fireEvent.click(fire);
    details = getByText('More details');
    fireEvent.click(details);
    favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);
    const linkFavorite = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);

    const pokemons = getAllByTestId('pokemon-name');

    expect(pokemons.length).toBe(2);
  });
});
