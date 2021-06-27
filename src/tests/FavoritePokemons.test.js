import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import data from '../data';

const pokemons = [data[0], data[1]];

describe('<FavoritePokemons.js /> component testing', () => {
  it('renders "No favorite pokemon found" if user has no favorite Pokémons', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('renders favorite Pokémon card', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More Details/i));
    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/Average weight/i)).toBeInTheDocument();
  });

  it('renders all favorite Pokémon cards', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('if user has no favorite Pokémons, does not render any cards', () => {
    const { container } = render(<FavoritePokemons />);
    expect(container.querySelector('.favorite_pokemons')).not.toBeInTheDocument();
  });
});
