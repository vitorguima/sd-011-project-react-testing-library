import { fireEvent } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const { getByText } = renderWithRouter(<Pokedex />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon quando o Próximo pokémon é clicado.', () => {
    const { getByTextId } = renderWithRouter(<Pokedex />);
    const nextPokemonButton = getByTextId('next-pokemon');
    const nextPokemon = jest.spyOn(Pokedex, 'nextPokemon');
    nextPokemon(numberOfPokemons);
    expect(Pokedex.state().pokemonIndex).toBe(0);
    fireEvent.click(nextPokemonButton);
    expect(Pokedex.state().pokemonIndex).toBe(1);
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
  });

  it('Testa se é criado botão de filtro para cada tipo de Pokémon.', () => {
  });

  it('O botão de Próximo deve ser desabilitado quando a lista tiver um pokémon.', () => {
  });
});
