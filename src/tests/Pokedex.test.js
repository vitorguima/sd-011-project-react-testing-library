import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const favoritesPokes = () => pokemons.reduce((acc, cv) => {
  acc[cv.id] = false;
  return acc;
}, {});

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokes() }
    />);
    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon se o botão Próximo pokémon é clicado.', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokes() }
    />);
    const buttonNext = getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((poke) => {
      expect(queryByText(poke.name)).toBeInTheDocument();
      fireEvent.click(buttonNext);
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokes() }
    />);

    const pokeRender = getAllByTestId('pokemon-name');
    expect(pokeRender.length).toBe(1);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokes() }
    />);

    const buttonReset = getByText('All');
    expect(buttonReset).toBeInTheDocument();

    fireEvent.click(buttonReset);
    const initialPoke = getByText('Pikachu');
    expect(initialPoke).toBeInTheDocument();
  });

  it('Teste se é criado um botão de filtro dinamicamente', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokes() }
    />);

    const pokeType = getByText('Poison');
    expect(pokeType).toBeInTheDocument();

    const pokeTestId = getAllByTestId('pokemon-type-button');
    expect(pokeTestId[1]).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser inativo quando tiver um só pokémon.', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokes() }
    />);

    const btnFilterOfPoison = getByText('Poison');
    fireEvent.click(btnFilterOfPoison);
    expect(btnFilterOfPoison).toBeInTheDocument();

    const buttonNext = getByRole('button', { name: /próximo pokémon/i });

    expect(buttonNext).toBeDisabled();
  });
});
