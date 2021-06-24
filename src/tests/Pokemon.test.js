import { fireEvent } from '@testing-library/dom';
import React from 'react';
import Pokemon from '../components/Pokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('testa  card com as informações de determinado pokémon.', () => {
    const { getByText, container } = renderWithRouter(<Pokemon
      pokemon={ Data[0] }
      showDetailsLink={ false }
      isFavorite
    />);
    const PokemonSelected = Data[0];
    const {
      averageWeight: { value, measurementUnit },
      image,
      name,
      type,
    } = PokemonSelected;

    const Pikachu = getByText(name);
    const TypeELetric = getByText(type);
    const Average = getByText(`Average weight: ${value} ${measurementUnit}`);
    const imgPokemon = container.querySelectorAll('img')[0];
    const imgFavorite = container.querySelectorAll('img')[1];

    expect(Pikachu).toBeInTheDocument();
    expect(TypeELetric).toBeInTheDocument();
    expect(Average).toBeInTheDocument();
    expect(imgPokemon.alt).toBe(`${name} sprite`);
    expect(imgPokemon.src).toBe(image);
    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(imgFavorite.alt).toBe(`${name} is marked as favorite`);
  });

  test('testa  link detalhes card  pokémon.', () => {
    const { id } = Data[0];
    const { getByText, history } = renderWithRouter(<App />);
    const getLink = getByText('More details');
    fireEvent.click(getLink);
    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${id}`);
  });
});
