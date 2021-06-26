import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonOverview = '.pokemon-overview';
const nextButtonId = 'next-pokemon';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons."', () => {
    /** Renderiza o componente App */
    const { container } = renderWithRouter(<App />);

    /** Verifica se o texto é "Encountered pokémons." */
    const h2 = container.querySelector('h2');
    expect(h2.innerHTML).toStrictEqual('Encountered pokémons');
  });

  test('É exibido o próximo Pokémon da lista quando "Próximo pokémon" é clicado?', () => {
    /** Renderiza o componente */
    const { getByText, container, getByTestId } = renderWithRouter(<App />);

    /** Captura o botão de 'próximo pokémon' e verifica seu conteúdo */
    const nextPokemon = getByTestId(nextButtonId);
    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon.textContent).toStrictEqual('Próximo pokémon');

    /** Verifica se os pokemons são mostrados um a um */
    const firstPokemon = container.querySelector(pokemonOverview).firstChild;
    data.forEach((pokemon, index) => {
      /** Dispara o click para ir ao próximo pokemon */
      fireEvent.click(nextPokemon);

      /** Espere que o pokemon vindo de data não seja igual ao primeiro pokemon que apareceu
       * na renderização da Pokedex. A cada iteração do forEarch, essa condicional irá passar
       * pois não há, até o décimo Pokémon, nenhum outro parecido com o Pikachu */
      expect(pokemon.name).not.toBe(firstPokemon.textContent);

      if (index !== data.length - 1) {
        const anyPokemonFromData = data[index + 1].name;
        /** Verifica se o se o Pokemon em data na posição [index + 1] está renderizado. */
        expect(getByText(anyPokemonFromData)).toBeInTheDocument();
      }
    });
    /** Como na iteração acima, já houve o clique no último pokémon, espera-se que o primeiro
     * esteja renderizado. Esta verificação abaixo fará a asserçao. */
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { container } = renderWithRouter(<App />);
    /** Como no site deve ser apenas exibido um pokémon por vez no início,
     * o teste verifica se existe apenas um elemento com a classe 'pokemon'; */
    const anyPokemon = container.getElementsByClassName('pokemon');
    expect(anyPokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { container, getAllByTestId } = renderWithRouter(<App />);

    /** Testa se aplicação tem botões de filtro por tipo */
    const allFilterButtons = getAllByTestId('pokemon-type-button');

    /** O forEach abaixo realiza a ação para cada botão */
    allFilterButtons.forEach((anyFilter) => {
      /** Espera que o botão esteja em tela e clique nele */
      expect(anyFilter).toBeInTheDocument();
      fireEvent.click(anyFilter);

      /** Verifica se o tipo do botão em tela corresponde ao que foi
       * clicado no filtro. */
      /** O nome do botão já corresponde ao tipo que é clicado. */
      const typeOfPoke = container.querySelector(pokemonOverview);
      expect(typeOfPoke.firstChild.nextSibling.textContent).toBe(anyFilter.textContent);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    /** Renderiza o site */
    const { container, getByTestId, getByText } = renderWithRouter(<App />);

    /** Verifica se o elemento de filtro "All" está em tela. */
    const all = getByText('All');
    expect(all).toBeInTheDocument();

    /** A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado; */
    fireEvent.click(getByText('All'));

    data.forEach((pokemon) => {
      const nextPokemon = getByTestId(nextButtonId);
      const anyPokemon = container.getElementsByClassName('pokemon');
      expect(anyPokemon).toHaveLength(1);

      const nameOfPoke = container.querySelector(pokemonOverview);
      expect(pokemon.name).toBe(nameOfPoke.firstChild.textContent);
      fireEvent.click(nextPokemon);
    });
  });

  test('Teste se cria, dinamicamente, botão de filtro para cada tipo de Pokémon.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId(nextButtonId);
    const bugButton = getByText('Bug');
    fireEvent.click(bugButton);
    expect(nextPokemon).toBeDisabled();
  });
});
