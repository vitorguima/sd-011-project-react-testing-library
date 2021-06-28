import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pikachuID = 25;
const onUpdateFavoritePokemons = jest.fn();

function pokemonBuild(id, favorite) {
  return renderWithRouter(<PokemonDetails
    match={ { params: { id: id.toString() } } }
    isPokemonFavoriteById={ { [id]: favorite } }
    pokemons={ pokemons }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
  />);
}

test('Teste se as informações do Pokémon são mostradas na tela', () => {
  pokemonBuild(pikachuID, false);

  screen.getByText('Pikachu Details');
  const moreDetails = screen.queryByText('More details');
  const summaryPokemonH2 = screen.getByText('Summary');
  const summaryPokemonParagraph = screen.getByText(pokemons[0].summary);
  expect(moreDetails).toBeNull();
  expect(summaryPokemonH2.tagName).toBe('H2');
  expect(summaryPokemonParagraph.tagName).toBe('P');
});

test('Teste se existe na pág. mapas contendo as localizações do pokémon', () => {
  pokemonBuild(pikachuID, false);

  const summaryPokemonH2 = screen.getByText('Game Locations of Pikachu');
  const locationImg = screen.getAllByAltText('Pikachu location');
  expect(summaryPokemonH2.tagName).toBe('H2');
  expect(locationImg.length).toBe(pokemons[0].foundAt.length);

  locationImg.forEach((img, index) => {
    expect(img.getAttribute('src')).toBe(pokemons[0].foundAt[index].map);
    expect(img.nextSibling.textContent).toBe(pokemons[0].foundAt[index].location);
  });
});

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { unmount } = pokemonBuild(pikachuID, false);

  const favtCheckLabel = screen.getByText('Pokémon favoritado?');
  const favtCheckInput = favtCheckLabel.querySelector('input');
  expect(onUpdateFavoritePokemons).toBeCalledTimes(0);
  fireEvent.click(favtCheckInput);
  expect(onUpdateFavoritePokemons).toBeCalledTimes(1);
  expect(onUpdateFavoritePokemons).toBeCalledWith(pokemons[0].id, true);

  unmount();
  onUpdateFavoritePokemons.mockClear();

  pokemonBuild(pikachuID, true);
  expect(onUpdateFavoritePokemons).toBeCalledTimes(0);
  fireEvent.click(screen.getByText('Pokémon favoritado?').querySelector('input'));
  expect(onUpdateFavoritePokemons).toBeCalledTimes(1);
  expect(onUpdateFavoritePokemons).toBeCalledWith(pokemons[0].id, false);
});
