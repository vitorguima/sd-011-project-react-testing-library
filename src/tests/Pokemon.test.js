import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const favoritePokemon = false;
const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('Testando o componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações do pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ favoritePokemon } />,
    );

    const name = getByText(pokemon.name);
    const type = getByText(pokemon.type);
    const weightObj = pokemon.averageWeight;
    const weight = getByText(
      `Average weight: ${weightObj.value} ${weightObj.measurementUnit}`,
    );
    const img = getByAltText(`${pokemon.name} sprite`);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(img.src).toBe(url);
  });

  it('Verifica se o card contém um link para detalhes com URL "/pokemons/id"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Verifica se quando clica no link, vai para a página de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${pokemon.id}`);
    const title = getByText(/pikachu details/i);
    expect(title).toBeInTheDocument();
  });

  it('Verifica se há um ícone de estrela no Pokémon favoritado', () => {
    const favorite = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ favorite } />,
    );

    const img = getByAltText(`${pokemon.name} is marked as favorite`);
    const url = 'star-icon.svg';

    expect(img.src).toContain(url);
  });
});
