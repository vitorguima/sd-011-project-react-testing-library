import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('1- Test the component <App.js />', () => {
  it('Should render a Pokedex text', () => {
    const { getByText } = renderWithRouter(<App />);
    const nav = getByText('Pokédex');
    expect(nav).toBeInTheDocument();
  });
  it('Should render Home, About and Favorite Pokémons links', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('Should redirect on click', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(home);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    fireEvent.click(about);
    expect(getByText('About Pokédex')).toBeInTheDocument();
    fireEvent.click(favoritePokemons);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
    history.push('/xablau');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
