import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

describe('Testes do componente <Pokedex.js />', () => {
  const nextPokemonButtonId = 'next-pokemon';

  it('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  describe('Testes relativos ao botão "Próximo pokémon"', () => {
    it('Testa os atributos do botão "Próximo pokémon"', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const nextPokemonButton = getByTestId(nextPokemonButtonId);

      expect(nextPokemonButton).toBeInTheDocument();
      expect(nextPokemonButton.tagName).toBe('BUTTON');
      expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');
    });

    it('Testa se os próximos pokémons da lista são mostrado ao clicar no botão ', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const nextPokemonButton = getByTestId(nextPokemonButtonId);

      Data.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(nextPokemonButton);
      });

      // Testa se o primeiro pokemon da lista é mostrado quando acaba o forEach do data
      const firstPokemon = getByText(Data[0].name);
      expect(firstPokemon).toBeInTheDocument();
    });

    it('Testa se é mostrado apenas um Pokémon por vez.', () => {
      const { getByText, getByTestId, container } = renderWithRouter(<App />);
      const nextPokemonButton = getByTestId(nextPokemonButtonId);

      Data.forEach((pokemon) => {
        const pokemons = container.querySelectorAll('.pokemon');
        expect(pokemons.length).toBe(1);
        expect(getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(nextPokemonButton);
      });
    });

    it('Testa se o botão Próximo pokémon é desativado quando há apenas 1 pokemon', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const bugTypeFilter = getByText('Bug');
      expect(bugTypeFilter).toBeInTheDocument();
      userEvent.click(bugTypeFilter);
      const nextPokemonButton = getByTestId(nextPokemonButtonId);
      expect(nextPokemonButton).toBeDisabled();
    });
  });

  describe('Testes relativos aos botões de filtro da pokedex', () => {
    it('Testa se a Pokédex tem os botões de filtro.', () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const typeButtons = getAllByTestId('pokemon-type-button');
      const numberOfTypeButtons = 7;

      expect(typeButtons).toHaveLength(numberOfTypeButtons);
    });

    it('Testa se a pokedex só mostra pokemons do tipo selecionado', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);

      const fireTypeFilter = getByText('Fire');
      const psychicTypeFilter = getByText('Psychic');
      const nextPokemonButton = getByTestId(nextPokemonButtonId);

      userEvent.click(fireTypeFilter);
      let pokemonType = getByTestId('pokemon-type');
      expect(getByText('Charmander')).toBeInTheDocument();
      expect(fireTypeFilter.innerHTML).toBe(pokemonType.innerHTML);
      // Esse expect verifica se o tipo do pokemon exibido é o mesmo tipo do filtro selecionado. Ele é repetido a cada troca de pokémon

      userEvent.click(nextPokemonButton);
      expect(getByText('Rapidash')).toBeInTheDocument();
      expect(fireTypeFilter.innerHTML).toBe(pokemonType.innerHTML);

      userEvent.click(psychicTypeFilter);
      pokemonType = getByTestId('pokemon-type');
      expect(getByText('Alakazam')).toBeInTheDocument();
      expect(psychicTypeFilter.innerHTML).toBe(pokemonType.innerHTML);

      userEvent.click(nextPokemonButton);
      expect(getByText('Mew')).toBeInTheDocument();
      expect(psychicTypeFilter.innerHTML).toBe(pokemonType.innerHTML);
    });
  });

  describe('Testes relativos ao botão "All"', () => {
    it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
      const { getByText } = renderWithRouter(<App />);

      const buttonAll = getByText('All');
      expect(buttonAll.tagName).toBe('BUTTON');
      expect(buttonAll).toHaveTextContent('All');
    });

    it('Testa se a pokedex mostra todos os pokemons quando o botão All é ativado', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const buttonAll = getByText('All');
      const nextPokemonButton = getByTestId(nextPokemonButtonId);

      userEvent.click(buttonAll);

      Data.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(nextPokemonButton);
      });
    });
  });
});
