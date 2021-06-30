import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('Teste o componente FavoritePokemons', () => {
  it('Teste caso não haja um pokemon favorito', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritos', () => {
    const { getByText, container, getAllByRole } = RenderWithRouter(<App />);

    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);

    const favoriteCheckbox = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteCheckbox);

    const favoriteList = getByText(/FavoritePokemons/i);
    fireEvent.click(favoriteList);

    const image = getAllByRole('img');
    expect(image.length).toBe(2);

    const info = container.querySelectorAll('p');
    console.log(info);

    const expectLengthOfTagP = 3;
    expect(info.length).toBe(expectLengthOfTagP);
    expect(getByText(/More details/i)).toBeInTheDocument();
  });
});
