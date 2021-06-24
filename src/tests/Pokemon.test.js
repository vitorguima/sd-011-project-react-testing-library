import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

const pokemon = { id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' };

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de cada pokemon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe(pokemon.name);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(pokemon.type);
    expect(pokemonWeight).toBeInTheDocument();

    const { averageWeight: { value, measurementUnit } } = pokemon;

    expect(pokemonWeight.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);

    const { image } = pokemon;

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', image);
  });

  test('Testa existencia de um Link, onde vai para detalhes', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const pokemonContainer = container.querySelector('.pokemon');
    const link = getByText('More details');

    expect(pokemonContainer).toContainElement(link);
    expect(link.pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  test('Testa se clicado no detalhes muda a pagina de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText('More details');

    fireEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe icone de estrela nos pokemons favoritados', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const detailLink = getByText(/More details/);

    fireEvent.click(detailLink);

    const favoritePokemon = getByLabelText('Pokémon favoritado?');

    fireEvent.click(favoritePokemon);

    const favIcon = getByAltText(`${pokemon.name} is marked as favorite`);

    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
