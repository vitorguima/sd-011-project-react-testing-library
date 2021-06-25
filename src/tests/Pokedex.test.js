import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import PokemonByTypes from './pokemonsByTypes';
import ObjPokemons from './objPokemons';
import pokemons from '../data';

const textHeading = 'Encountered pokémons';
const msgBtn = 'Próximo pokémon';
const btnNextId = 'next-pokemon';
const pokemonNameId = 'pokemon-name';
const typeButtonId = 'pokemon-type-button';
const pokemonsArr = [...pokemons];
const shortPokemonsArr = [pokemons[0], pokemons[1]];
const objPokemons = ObjPokemons(pokemonsArr, false);
const pokemonsByTypes = PokemonByTypes(pokemonsArr);

const testHeading = () => {
  const {
    getByText,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const h2 = getByText(/Encountered pokémons/i);
  expect(h2).toBeInTheDocument();
};

const testButtonText = () => {
  const {
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const btn = getByTestId(btnNextId);
  expect(btn.innerHTML).toBe(msgBtn);
};

const testShowPokemonsClick = () => {
  const {
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  pokemonsArr.forEach((pokemon) => {
    const pokeName = getByTestId(pokemonNameId).innerHTML;
    expect(pokeName).toBe(pokemon.name);
    const btn = getByTestId(btnNextId);
    fireEvent.click(btn);
  });
};

const testClickNextInTheLast = () => {
  const {
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  pokemonsArr.forEach(() => {
    const btn = getByTestId(btnNextId);
    fireEvent.click(btn);
  });
  const pokeName = getByTestId(pokemonNameId).innerHTML;
  expect(pokeName).toBe(pokemonsArr[0].name);
};

const testShowOnePoke = () => {
  const {
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  pokemonsArr.forEach(() => {
    const pokeName = getByTestId(pokemonNameId);
    expect(pokeName).toBeInTheDocument();
    const btn = getByTestId(btnNextId);
    fireEvent.click(btn);
  });
};

const testOnlyOnePokemonType = () => {
  const {
    getAllByTestId,
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const buttons = getAllByTestId(typeButtonId);
  buttons.forEach((button) => {
    fireEvent.click(button);
    pokemonsByTypes[button.innerHTML].forEach((poke) => {
      expect(getByTestId(pokemonNameId).innerHTML).toBe(poke.name);
      const btn = getByTestId(btnNextId);
      fireEvent.click(btn);
    });
  });
};

const testButtonTypeName = () => {
  const {
    getAllByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const types = Object.keys(pokemonsByTypes);
  types.shift();
  types.forEach((type) => {
    const buttons = getAllByTestId(typeButtonId);
    expect(buttons.some((element) => element.innerHTML === type))
      .toBe(true);
  });
};

const testButtonResetText = () => {
  const {
    getByText,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const button = getByText('All');
  expect(button).toBeInTheDocument();
};

const testShowPokemonWithoutFilter = () => {
  const {
    getByText,
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const buttonAll = getByText('All');
  fireEvent.click(buttonAll);
  const buttonNext = getByTestId(btnNextId);
  pokemonsByTypes.All.forEach((poke) => {
    expect(getByTestId(pokemonNameId).innerHTML).toBe(poke.name);
    fireEvent.click(buttonNext);
  });
};

const testFirstNoFilter = () => {
  const {
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const buttonNext = getByTestId(btnNextId);
  pokemonsByTypes.All.forEach((poke) => {
    expect(getByTestId(pokemonNameId).innerHTML).toBe(poke.name);
    fireEvent.click(buttonNext);
  });
};

const testButtonFilterDinamic = () => {
  let {
    getAllByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ shortPokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  let buttonsTypes = getAllByTestId(typeButtonId);
  expect(buttonsTypes.length).toBe(2);
  getAllByTestId = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  ).getAllByTestId;
  buttonsTypes = getAllByTestId(typeButtonId);
  expect(buttonsTypes.length).toBe(Object.keys(pokemonsArr).length);
};

const testShowAllFilterTypes = () => {
  const {
    getAllByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const buttonTypes = getAllByTestId(typeButtonId);
  const types = [...Object.keys(pokemonsByTypes)];
  types.shift();
  buttonTypes.forEach((btn, index) => {
    expect(btn.innerHTML).toBe(types[index]);
  });
};

const testAllButtonAlwaysVisible = () => {
  const {
    container,
    getAllByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ pokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const buttonTypes = getAllByTestId(typeButtonId);
  buttonTypes.forEach((btn, index, arr) => {
    const buttonAll = container.querySelector('.filter-button');
    expect(buttonAll).toBeInTheDocument();
    if (index < arr.length - 1) fireEvent.click(buttonTypes[index + 1]);
  });
};

const testDisableNextButtonAtLastPoke = () => {
  const {
    getAllByTestId,
    getByTestId,
  } = renderWithRouter(
    <Pokedex pokemons={ shortPokemonsArr } isPokemonFavoriteById={ objPokemons } />,
  );
  const buttonTypes = getAllByTestId(typeButtonId);
  buttonTypes.forEach((btn) => {
    fireEvent.click(btn);
    const nextBtn = getByTestId(btnNextId);
    expect(nextBtn.disabled).toBe(true);
  });
};

describe('Teste o componente <Pokedex.js />', () => {
  it(`Teste se página contém um heading h2 com o texto ${textHeading}`, testHeading);
  describe(`Teste se é exibido o próximo Pokémon da lista quando o botão\
   ${msgBtn} é clicado.`,
  () => {
    it(`O botão deve conter o texto ${msgBtn}`, testButtonText);
    it('Pokémons da lista devem ser mostrados,um a um, ao clicar sucessivamente no botão',
      testShowPokemonsClick);
    it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,'
      + 'se estiver no último Pokémon da lista', testClickNextInTheLast);
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', testShowOnePoke);
  describe('Teste se a Pokédex tem os botões de filtro.', () => {
    it('A partir da seleção de um botão de tipo,'
      + ' a Pokédex deve circular somente pelos pokémons daquele tipo;',
    testOnlyOnePokemonType);
    it('O texto do botão deve corresponder ao nome do tipo', testButtonTypeName);
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All', testButtonResetText);
    it('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)'
      + ' quando o botão All for clicado;', testShowPokemonWithoutFilter);
    it('Ao carregar a página, o filtro selecionado deverá ser All', testFirstNoFilter);
  });
  describe('Teste se é criado, dinamicamente,'
    + ' um botão de filtro para cada tipo de Pokémon.', () => {
    it('Os botões de filtragem devem ser dinâmicos', testButtonFilterDinamic);
    it('Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados'
      + ', sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo'
      + ' Fire, Psychic, Electric, Bug, Poison, Dragon e Normal', testShowAllFilterTypes);
    it('Deve ser mostrado como opção de filtro,'
      + ' um botão para cada um dos tipos.'
      + ' Além disso, o botão All precisa estar sempre visível.',
    testAllButtonAlwaysVisible);
  });
  it(`O botão de ${msgBtn} deve ser desabilitado quando a lista\
   filtrada de Pokémons tiver um só pokémon.`, testDisableNextButtonAtLastPoke);
});
