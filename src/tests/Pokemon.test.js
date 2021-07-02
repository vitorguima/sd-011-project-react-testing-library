import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from '../renderRouter';
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

describe('Teste do componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    // Acessar os elementos da tela
    const { getByText, getByAltText } = renderRouter(
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
    // Fazer os testes
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(img.src).toBe(url);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link /pokemons/id', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    const details = getByText(/more details/i);
    // Interagir com a aplicação
    fireEvent.click(details);
    const link = history.location.pathname;
    // Fazer os testes
    expect(link).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Teste se clicar no link do Pokémon, é direcionado para a page de detalhes', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    const details = getByText(/more details/i);
    // Interagir com a aplicação
    fireEvent.click(details);
    const link = history.location.pathname;
    // Fazer os testes
    expect(link).toBe(`/pokemons/${pokemon.id}`);
    const title = getByText(/pikachu details/i);
    expect(title).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    // Acessar os elementos da tela
    const favorite = true;
    const { getByAltText } = renderRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ favorite } />,
    );
    const image = getByAltText(`${pokemon.name} is marked as favorite`);
    const link = 'star-icon.svg';
    // Fazer os testes
    expect(image.src).toContain(link);
  });
});
