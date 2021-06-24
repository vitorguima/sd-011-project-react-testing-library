import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const caterpie = pokemons[2];

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { value, measurementUnit } = caterpie.averageWeight;
    const { getByText, container } = renderWithRouter(
      <Pokemon pokemon={caterpie} isFavorite={false} />,
    );
    const imagePokemon = container.querySelector('img');
    expect(imagePokemon.src).toBe(caterpie.image);
    expect(imagePokemon.alt).toBe(`${caterpie.name} sprite`);
    expect(getByText(caterpie.name)).toBeInTheDocument();
    expect(getByText(caterpie.type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de nav.', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={caterpie} isFavorite={false} />,
    );
    const linkPokemon = container.querySelector('a');
    expect(linkPokemon.href).toBe(`http://localhost/pokemons/${caterpie.id}`);
  });

  it('Ao clicar no link de navegação do Pokémon, redireciona para os detalhes.', () => {
    const { container, history } = renderWithRouter(
      <Pokemon pokemon={caterpie} isFavorite={false} />,
    );
    const linkPokemon = container.querySelector('a');
    fireEvent.click(linkPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${caterpie.id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { container, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);

    const imagePokemon = container.querySelectorAll('img');
    expect(imagePokemon[1].src).toContain('/star-icon.svg');
    expect(imagePokemon[1].alt).toContain('Pikachu is marked as favorite');
  });
});
