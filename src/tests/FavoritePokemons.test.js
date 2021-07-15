import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('test favorite pokemom', () => {
  it('test message if no favorite is found', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('test if favorite pokemons are rendered', () => {
    const { getByText, container, getAllByRole } = RenderWithRouter(<App />);
    const details = getByText(/More Details/i);
    fireEvent.click(details);
    const favoriteCheckbox = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteCheckbox);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    const img = getAllByRole('img');
    expect(img.length).toBe(2);
    const pokeInfo = container.querySelectorAll('p');
    const expectLenghtOfP = 3;
    expect(pokeInfo.length).toBe(expectLenghtOfP);
    expect(getByText(/More details/i)).toBeInTheDocument();
  });
});
