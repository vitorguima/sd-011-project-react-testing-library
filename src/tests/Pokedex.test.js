import React from 'react';
import { fireEvent, within } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const buttonId = 'next-pokemon';
function fetchPokemonTypes(pokemonsArray) {
  return [...new Set(pokemonsArray.reduce((types, { type }) => [...types, type], []))];
}

describe('verifica o heading', () => {
  it('testa se o heading é do tipo h2 com o texto correto', () => {
    const favoritePokemons = {};

    const { container } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );
    const heading = container.querySelector('h2');

    expect(heading).toContainHTML('Encountered pokémons');
  });
});

describe(('testa se é exibido o próximo Pokémon da lista'
+ 'quando o botão Próximo pokémon é clicado'), () => {
  let getByTestId;
  let getByText;
  let getAllByTestId;

  beforeEach(() => {
    ({ getByTestId, getByText, getAllByTestId } = renderWithRouter(<App />));
  });

  it('verifica o texto do botão', () => {
    const nextPokemonBtn = getByTestId(buttonId);
    const btnText = within(nextPokemonBtn).getByText(/Próximo pokémon/i);

    expect(btnText).toBeInTheDocument();
  });

  it('verifica se ao clicar no botão o próximo pokémon é exibido', () => {
    const nextPokemonBtn = getByTestId(buttonId);
    pokemons.forEach((value, index, array) => {
      const name = index < array.length
        ? value.name
        : array[0].name;
      expect(getByText(name)).toBeDefined();

      fireEvent.click(nextPokemonBtn);
    });
  });

  it('testa se é exibido apenas um pokemon por vez', () => {
    const nextPokemonBtn = getByTestId(buttonId);
    pokemons.forEach(() => {
      const pokemonArray = getAllByTestId('pokemon-name');

      expect(pokemonArray.length).toBe(1);

      fireEvent.click(nextPokemonBtn);
    });
  });
});

describe('teste do botão de reset de filtro', () => {
  let getByTestId;
  let getByText;

  const checksIfNoFiltersAreSelected = () => {
    const nextPokemonBtn = getByTestId(buttonId);

    pokemons.forEach((value) => {
      const pokemonName = getByTestId('pokemon-name');

      expect(pokemonName).toContainHTML(value.name);

      fireEvent.click(nextPokemonBtn);
    });
  };

  beforeEach(() => {
    ({ getByTestId, getByText } = renderWithRouter(<App />));
  });

  it('verifica se o botão all existe', () => {
    const resetBtn = getByText('All');

    expect(resetBtn).toBeInTheDocument();
    expect(resetBtn).toHaveProperty('type', 'button');
  });

  it('verifica se o botão all reseta os filtros', () => {
    const resetBtn = getByText('All');
    const fireBtn = getByText('Fire');

    fireEvent.click(fireBtn);
    fireEvent.click(resetBtn);

    checksIfNoFiltersAreSelected();
  });

  it('verifica se a pagina carrega com o filtro all selecionado', () => {
    checksIfNoFiltersAreSelected();
  });
});

describe('testa os botões de filtro', () => {
  const testId = 'pokemon-type-button';
  const favoritePokemons = {};

  it('testa se os botões são criados dinamicamente', () => {
    const singlePokemon = [pokemons[0]];
    const {
      getAllByTestId,
    } = renderWithRouter(
      <Pokedex
        pokemons={ singlePokemon }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );
    const buttonCount = getAllByTestId(testId);
    expect(buttonCount.length).toBe(1);
  });

  it('testa se todos os botões de filtro solicitados existem', () => {
    const {
      getAllByTestId,
      getByText,
    } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );

    const typeBtns = getAllByTestId(testId);
    const types = fetchPokemonTypes(pokemons);
    const butonAll = getByText('All');

    typeBtns.forEach((value, index) => {
      expect(value).toContainHTML(types[index]);
      expect(butonAll).toBeInTheDocument();
      expect(butonAll).toHaveAttribute('type', 'button');
    });
  });
});

describe('teste do botão next pokemon', () => {
  const favoritePokemons = {};

  const { getByTestId, getByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />,
  );
  const nextPokemonBtn = getByTestId(buttonId);
  const poisonBtn = getByText('Poison');

  fireEvent.click(poisonBtn);

  expect(nextPokemonBtn).toBeDisabled();
});
