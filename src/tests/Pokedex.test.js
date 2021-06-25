import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemonNameTestId = 'pokemon-name';
const nextPokemonTestId = 'next-pokemon';
const namePokemons = pokemons.map(({ name }) => name);

describe('Requisito 5', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons".',
    () => {
      const { container } = renderWithRouter(<App />, { route: '/' });
      const h2 = container.querySelector('h2');
      expect(h2.textContent).toBe('Encountered pokémons');
    });

  describe(`Teste se é exibido o próximo Pokémon da lista quando 
  o botão "Próximo pokémon" é clicado.`,
  () => {
    it('O botão deve conter o texto Próximo pokémon;',
      () => {
        const { getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
        const all = getByText('All');
        fireEvent.click(all);
        const pokemon = getByTestId(pokemonNameTestId);
        expect(pokemon.innerHTML).toBe('Pikachu');
        const button = getByTestId(nextPokemonTestId);
        expect(button.innerHTML).toBe('Próximo pokémon');
      });

    it(`Os próximos Pokémons da lista devem ser mostrados,
    um a um, ao clicar sucessivamente no botão;`,
    () => {
      const { getByTestId } = renderWithRouter(<App />, { route: '/' });
      const pokemon = getByTestId(pokemonNameTestId);
      expect(pokemon.innerHTML).toBe('Pikachu');
      fireEvent.click(getByTestId(nextPokemonTestId));
      expect(pokemon.innerHTML).toBe('Charmander');
    });

    it(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
    se estiver no último Pokémon da lista;`,
    () => {
      const { getByTestId } = renderWithRouter(<App />, { route: '/' });
      const pokemon = getByTestId(pokemonNameTestId);
      const nextPokemon = getByTestId(nextPokemonTestId);
      namePokemons.forEach((e) => {
        const poke = getByTestId(pokemonNameTestId);
        expect(poke.textContent).toBe(e);
        fireEvent.click(nextPokemon);
      });
      expect(pokemon.textContent).toBe('Pikachu');
    });
  });

  it(`A Pokédex deve ter os botões de filtro, no qual,
  O texto do botão seja correspondente ao nome do tipo;`,
  () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId('pokemon-type-button');
    typeButton.forEach((tipo) => {
      fireEvent.click(tipo);
      const pokeType = getByTestId('pokemon-type');
      expect(pokeType.textContent).toEqual(tipo.textContent);
    });
  });
});
