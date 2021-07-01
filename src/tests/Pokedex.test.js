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
        // Teste se é mostrado apenas um Pokémon por vez.
        expect(pokemonName).toBeInTheDocument();
        fireEvent.click(nextPokemon);
      });
      // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
      expect(getByText('Pikachu')).toBeInTheDocument();
    });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole } = renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const btntype = getByRole('button', { name: type });
      expect(btntype).toBeInTheDocument();
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    // O texto do botão deve ser All
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
  it('seleção de um botão de tipo, circular somente pelos pokémons daquele tipo', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnType = getByRole('button', { name: 'Fire' });
    fireEvent.click(btnType);
    expect(getByTestId('pokemon-type')).toHaveTextContent('Fire'); // Verifica o texto no elemento html
    const btnNextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(btnNextPokemon);
    expect(getByTestId('pokemon-type')).toHaveTextContent('Fire'); // Verifica o texto no elemento html
  });
  it('Teste deverá mostrar os Pokémons normalmente quando o botão All for clicado',
    () => {
      const { getByRole, getByText } = renderWithRouter(<App />);
      const btnType = getByRole('button', { name: /All/i });
      const btnNextPokemon = getByRole('button', { name: /Próximo pokémon/i });
      fireEvent.click(btnType);
      pokemons.forEach(({ name }) => {
        expect(getByText(name)).toBeInTheDocument();
        fireEvent.click(btnNextPokemon);
      });
    });
  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const btnTypeAll = getByRole('button', { name: /All/i });
    const btnNextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(btnTypeAll);
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(btnNextPokemon);
    });
  });
  it('Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados,',
    () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const allPokemonTypes = pokemons.map((pokemon) => pokemon.type);
      const allButtonTypes = getAllByTestId('pokemon-type-button');
      allButtonTypes.forEach((button) => {
        allPokemonTypes.includes(button.textContent);
      });
    });
});
