import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import Data from '../data';

describe('Testa o funcionamento do componente <Pokemon />', () => {
  it('Testa se é renderizado o nome, tipo, peso médio e a imagem do pokémon', () => {
    const pikachu = Data[0];
    const { value, measurementUnit } = pikachu.averageWeight;
    const { getByText, container } = renderWithRouter(
      <Pokemon pokemon={ pikachu } />,
    );

    const pokemonImage = container.querySelector('img');
    expect(getByText(pikachu.name)).toBeInTheDocument();
    expect(getByText(pikachu.type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('Testa se mostra detalhes do pokémon', () => {
    const charmander = Data[1];
    const { getByText, history } = renderWithRouter(<App />);
    const firePokemon = getByText('Fire');
    fireEvent.click(firePokemon);
    const linkDetails = getByText(/More Details/i);
    fireEvent.click(linkDetails);
    const link = history.location.pathname;
    expect(link).toBe(`/pokemons/${charmander.id}`);
  });

  it('Testa se tem ícone de estrelas', () => {
    const { getByText, container, getByAltText } = renderWithRouter(<App />);
    const bugPokemon = getByText('Bug');
    fireEvent.click(bugPokemon);
    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);
    const favoritePokemonLabel = container.querySelector('#favorite');
    fireEvent.click(favoritePokemonLabel);
    const star = getByAltText('Caterpie is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
