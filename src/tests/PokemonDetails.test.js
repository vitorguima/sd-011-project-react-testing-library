import React from 'react';
import { fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import ObjPokemons from './objPokemons';

import pokemons from '../data';

const objPokemons = ObjPokemons(pokemons, false);
const pokemon = pokemons[0];
const msgCheckbox = 'Pokémon favoritado?';

const onUpdateFavoritePokemons = (pokemonId, isFavorite) => {
  objPokemons[pokemonId] = isFavorite;
};

const testNameDetails = () => {
  const { id, name } = pokemon;
  const { getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const textPokeDetails = getByText(`${name} Details`);
  expect(textPokeDetails).toBeInTheDocument();
};

const testNoLinkToDetails = () => {
  const { id } = pokemon;
  const { queryByRole } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const link = queryByRole('link');
  expect(link).not.toBeInTheDocument();
};

const testSummaryText = () => {
  const { id } = pokemon;
  const { getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const summaryTitle = getByText(/summary/i);
  expect(summaryTitle).toBeInTheDocument();
  expect(summaryTitle.nodeName).toMatch(/h2/i);
};

const testPokeParagraph = () => {
  const { id, summary } = pokemon;
  const { getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const summaryContent = getByText(summary);
  expect(summaryContent).toBeInTheDocument();
  expect(summaryContent.nodeName).toMatch(/p/i);
};

const testGameLocations = () => {
  const { id, name } = pokemon;
  const { getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const GameLocationTitle = getByText(`Game Locations of ${name}`);
  expect(GameLocationTitle).toBeInTheDocument();
  expect(GameLocationTitle.nodeName).toMatch(/h2/i);
};

const testShowAllPokeLocations = () => {
  const { id, name, foundAt } = pokemon;
  const { getAllByAltText, getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const altLocationImage = `${name} location`;
  const locationImages = getAllByAltText(altLocationImage);
  expect(locationImages.length).toBe(foundAt.length);
  foundAt.forEach(({ location }) => {
    const locationText = getByText(location);
    expect(locationText).toBeInTheDocument();
  });
};

const testImageLocation = () => {
  const { id, name, foundAt } = pokemon;
  const { getAllByAltText, getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const altLocationImage = `${name} location`;
  const locationImages = getAllByAltText(altLocationImage);
  const locationSrcs = locationImages.map((element) => element.src);
  foundAt.forEach(({ location, map }) => {
    const locationText = getByText(location);
    expect(locationText).toBeInTheDocument();
    expect(locationSrcs.includes(map)).toBe(true);
  });
};

const testFavorite = () => {
  const { id } = pokemon;
  const { getByRole } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
};

const testClicksFavorite = () => {
  const { id } = pokemon;
  const { getByRole } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(objPokemons[id]).toBe(!checkbox.checked);
  fireEvent.click(checkbox);
  expect(objPokemons[id]).toBe(!checkbox.checked);
};

const testLabelCheckbox = () => {
  const { id } = pokemon;
  const { getByLabelText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ objPokemons }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        onUpdateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
  const labelCheckbox = getByLabelText(msgCheckbox);
  expect(labelCheckbox).toBeInTheDocument();
};

describe('Teste o componente <PokemonDetails.js />', () => {
  describe('Teste se as informações detalhadas'
    + ' do Pokémon selecionado são mostradas na tela.', () => {
    it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;',
      testNameDetails);
    it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
      testNoLinkToDetails);
    it('A seção de detalhes deve conter um heading h2 com o texto Summary',
      testSummaryText);
    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon'
      + ' específico sendo visualizado.',
    testPokeParagraph);
  });
  describe('Teste se existe na página uma seção com os mapas'
    + ' contendo as localizações do pokémon', () => {
    it('Na seção de detalhes deverá existir um heading h2 com o texto'
      + ' Game Locations of <name>; onde <name> é o nome do Pokémon exibido.',
    testGameLocations);
    it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;',
      testShowAllPokeLocations);
    it('Devem ser exibidos, o nome da localização e uma imagem'
      + ' do mapa em cada localização;', testImageLocation);
    it('A imagem da localização deve ter um atributo src com a URL da localização;',
      testImageLocation);
    it('A imagem da localização deve ter um atributo alt com o texto <name>'
      + ' location, onde <name> é o nome do Pokémon;', testShowAllPokeLocations);
  });
  describe('Teste se o usuário pode favoritar um pokémon'
    + ' através da página de detalhes.', () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon;', testFavorite);
    it('Cliques alternados no checkbox devem adicionar e remover'
      + ' respectivamente o Pokémon da lista de favoritos;', testClicksFavorite);
    it(`O label do checkbox deve conter o texto ${msgCheckbox};`, testLabelCheckbox);
  });
});
