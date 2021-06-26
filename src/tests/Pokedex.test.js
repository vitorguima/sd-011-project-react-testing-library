import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      const headingH2 = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
      expect(headingH2).toBeInTheDocument();
    });
  it('Teste botão Próximo Pokémon, quando clicado mostra o próximo pokemon da lista',
    () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      // O botão deve conter o texto Próximo pokémon;
      const buttonNextPOkemon = getByTestId('next-pokemon');
      expect(buttonNextPOkemon.innerHTML).toBe('Próximo pokémon');

      // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
      const nextPokemon = getByText('Próximo pokémon');
      pokemons.forEach((pokemon) => {
        const pokemonName = getByText(pokemon.name);
        expect(pokemonName).toBeInTheDocument();
        fireEvent.click(nextPokemon);
      });
      // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
      expect(getByText('Pikachu')).toBeInTheDocument();
    });
});
