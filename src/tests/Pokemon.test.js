import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemon = pokemons[0];

const testCardPokemonName = () => {
  const { getByTestId } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName.innerHTML).toBe(pokemon.name);
};

const testCardType = () => {
  const { getByTestId } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const pokemontype = getByTestId('pokemon-type');
  expect(pokemontype).toBeInTheDocument();
  expect(pokemontype.innerHTML).toBe(pokemon.type);
};

const testAverageWeigth = () => {
  const { getByTestId } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const { measurementUnit, value } = pokemon.averageWeight;
  const pokemonWeigth = getByTestId('pokemon-weight');
  expect(pokemonWeigth).toBeInTheDocument();
  const tagWeight = `Average weight: ${value} ${measurementUnit}`;
  expect(pokemonWeigth.innerHTML).toBe(tagWeight);
};

const testImgPokemon = () => {
  const { getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const altPokemon = `${pokemon.name} sprite`;
  const imgPokemon = getByAltText(altPokemon);
  expect(imgPokemon).toBeInTheDocument();
  expect(imgPokemon.src).toBe(pokemon.image);
};

const testLinkPokemonDetails = () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const link = getByRole('link');
  expect(link).toBeInTheDocument();
  const url = `/pokemons/${pokemon.id}`;
  expect(link.href).toMatch(url);
};

const testLinkToDetails = () => {
  const { getByRole, history } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const link = getByRole('link');
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  const { pathname } = history.location;
  const url = `/pokemons/${pokemon.id}`;
  expect(pathname).toBe(url);
};

const testFavoritePokemonIcon = () => {
  const { getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pokemon }
    showDetailsLink
    isFavorite
  />);
  const altText = `${pokemon.name} is marked as favorite`;
  const iconImg = getByAltText(altText);
  expect(iconImg).toBeInTheDocument();
  expect(iconImg.src).toMatch('/star-icon.svg');
};

describe('Teste o componente <Pokemon.js />', () => {
  describe('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      it('O nome correto do Pokémon deve ser mostrado na tela;',
        testCardPokemonName);
      it('O tipo correto do pokémon deve ser mostrado na tela.', testCardType);
      it('O peso médio do pokémon deve ser exibido com um texto no formato'
        + ' Average weight: <value> <measurementUnit>;'
        + ' onde <value> e <measurementUnit> são, respectivamente, o peso médio'
        + ' do pokémon e sua unidade de medida.', testAverageWeigth);
      it('A imagem do Pokémon deve ser exibida.'
        + ' Ela deve conter um atributo src com a URL da imagem e um atributo'
        + ' alt com o texto <name> sprite, onde <name> é o nome do pokémon;',
      testImgPokemon);
    });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
    + ' para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
    + ' onde <id> é o id do Pokémon exibido;', testLinkPokemonDetails);
  it('Teste se ao clicar no link de navegação do Pokémon,'
    + ' é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.',
  testLinkToDetails);
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
    + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver;', testLinkToDetails);
  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    it('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg',
      testFavoritePokemonIcon);
    it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,'
      + ' onde <pokemon> é o nome do Pokémon exibido.',
    testFavoritePokemonIcon);
  });
});
