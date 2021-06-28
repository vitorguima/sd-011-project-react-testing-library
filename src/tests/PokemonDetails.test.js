import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

const matchTest = {
  isExact: true,
  params: {
    id: '25',
  },
  path: '/pokemons/:id',
  url: '/pokemons/25',
};

const favortieByID = {
  25: false,
};

const pokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard',
  },
];

describe('When render PokemonDetails', () => {
  it('have a text whit "<name> Details"', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favortieByID }
        match={ matchTest }
        pokemons={ pokemon }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const pokemonDetaislTitle = getByText('Pikachu Details');
    expect(pokemonDetaislTitle).toBeInTheDocument();
  });

  it('have not a link to Details', () => {
    const { queryByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favortieByID }
        match={ matchTest }
        pokemons={ pokemon }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const detailsLink = queryByRole('link');
    expect(detailsLink).toBe(null);
  });

  it('have a summary', () => {
    const { getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favortieByID }
        match={ matchTest }
        pokemons={ pokemon }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const detaislSummary = getAllByRole('heading');
    expect(detaislSummary[1].innerHTML).toBe('Summary');
  });

  it('have a summary text', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favortieByID }
        match={ matchTest }
        pokemons={ pokemon }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const paragraphSummary = getByText('This intelligent Pokémon roasts hard');
    expect(paragraphSummary).toBeInTheDocument();
  });
});

describe('When render Detais, have a location area', () => {
  it('with a <h2> "Game location"', () => {
    const { getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favortieByID }
        match={ matchTest }
        pokemons={ pokemon }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const headingGameLocation = getAllByRole('heading', { level: 2 });
    expect(headingGameLocation[2].innerHTML).toBe('Game Locations of Pikachu');
  });

  it('show all locations', () => {
    const { getAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favortieByID }
        match={ matchTest }
        pokemons={ pokemon }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const locationsPokemon = getAllByAltText('Pikachu location');
    expect(locationsPokemon.length).toBe(2);
    expect(locationsPokemon[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsPokemon[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  describe('When render Detais favorite pokemon', () => {
    it('have a checkbox', () => {
      const { getByRole } = renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ favortieByID }
          match={ matchTest }
          pokemons={ pokemon }
          onUpdateFavoritePokemons={ () => {} }
        />,
      );
      const checkboxFavorite = getByRole('checkbox');
      expect(checkboxFavorite.id).toBe('favorite');
    });

    it('click on favorite', () => {
      // let favoriteByIdTest = {
      //   25: false,
      // };

      // function changeFavorite() {
      //   favoriteByIdTest = {
      //     25: true,
      //   };
      //   return favoriteByIdTest;
      // }

      const { getByRole } = renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ favortieByID }
          match={ matchTest }
          pokemons={ pokemon }
          onUpdateFavoritePokemons={ () => {} }
        />,
      );
      const checkboxFavorite = getByRole('checkbox');
      expect(checkboxFavorite.checked).toBe(false);
      // fireEvent.click(checkboxFavorite);
      // expect(checkboxFavorite.checked).toBe(true);
    });

    it('have a label with "pokémon favotitado?"', () => {
      const { getByLabelText } = renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ favortieByID }
          match={ matchTest }
          pokemons={ pokemon }
          onUpdateFavoritePokemons={ () => {} }
        />,
      );
      const checkboxLabel = getByLabelText('Pokémon favoritado?');
      expect(checkboxLabel).toBeInTheDocument();
    });
  });
});
