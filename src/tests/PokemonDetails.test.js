import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const PIKACHU_ID = 25;
const onUpdateFavoritePokemons = jest.fn();

function build(id, favorite) {
  return render(<PokemonDetails
    match={ { params: { id: id.toString() } } }
    isPokemonFavoriteById={ { [id]: favorite } }
    pokemons={ pokemons }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
  />);
}

test('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  build(PIKACHU_ID, false);

  screen.getByText('Pikachu Details');

  const moreDetailsLink = screen.queryByText('More details');
  expect(moreDetailsLink).toBeNull();

  const summaryH2 = screen.getByText('Summary');
  expect(summaryH2.tagName).toBe('H2');

  const summaryParagraph = screen.getByText(pokemons[0].summary);
  expect(summaryParagraph.tagName).toBe('P');
});

test('existe uma seção com os mapas contendo as localizações do pokémon', () => {
  build(PIKACHU_ID, false);

  // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
  const summaryH2 = screen.getByText('Game Locations of Pikachu');
  expect(summaryH2.tagName).toBe('H2');

  // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
  // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
  // A imagem da localização deve ter um atributo src com a URL da localização;
  // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
  const locationImages = screen.getAllByAltText('Pikachu location');
  expect(locationImages.length).toBe(pokemons[0].foundAt.length);

  locationImages.forEach((image, index) => {
    expect(image.getAttribute('src')).toBe(pokemons[0].foundAt[index].map);
    expect(image.nextSibling.textContent).toBe(pokemons[0].foundAt[index].location);
  });
});

test('o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { unmount } = build(PIKACHU_ID, false);

  const favoriteCheckboxLabel = screen.getByText('Pokémon favoritado?');
  const favoriteCheckboxInput = favoriteCheckboxLabel.querySelector('input');

  expect(onUpdateFavoritePokemons).toBeCalledTimes(0);

  fireEvent.click(favoriteCheckboxInput);

  expect(onUpdateFavoritePokemons).toBeCalledTimes(1);
  expect(onUpdateFavoritePokemons).toBeCalledWith(pokemons[0].id, true);

  unmount();
  onUpdateFavoritePokemons.mockClear();

  build(PIKACHU_ID, true);

  expect(onUpdateFavoritePokemons).toBeCalledTimes(0);

  fireEvent.click(screen.getByText('Pokémon favoritado?').querySelector('input'));

  expect(onUpdateFavoritePokemons).toBeCalledTimes(1);
  expect(onUpdateFavoritePokemons).toBeCalledWith(pokemons[0].id, false);
});
