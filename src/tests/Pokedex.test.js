import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';

describe('Testa o componente <Pokedex.js />', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
    {
      id: 23,
      name: 'Ekans',
      type: 'Poison',
      averageWeight: {
        value: '6.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    },
  ];
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
    },
  ];
  describe('Testa o componente <Pokedex.js />', () => {
    const isPokemonFavoriteById = {
      4: false,
      10: false,
      23: false,
      25: false,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };
    it('se página contém um heading h2 com o texto Encountered pokémons.', () => {
      const { getByText } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const heading = getByText(/Encountered pokémons/);
      expect(heading).toBeInTheDocument();
    });

    it('Testa se é exibido o próximo Pokémon quando o botão é clicado.', () => {
      const { getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const button = getByTestId('next-pokemon');
      fireEvent.click(button);
      const pokemonName = getByTestId('pokemon-name');
      expect(button.textContent).toBe('Próximo pokémon');
      expect(pokemonName.textContent).toBe('Ekans');
      fireEvent.click(button);
      expect(pokemonName.textContent).toBe('Pikachu');
    });

    it('se é mostrado apenas um Pokémon por vez.', () => {
      const { container } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const card = container.getElementsByClassName('pokemon-overview');
      expect(card.length).toBe(1);
    });

    it('Testa se a Pokédex tem os botões de filtro.', () => {
      const { getAllByRole, getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const buttons = getAllByRole('button');
      const poison = buttons.find((button) => button.textContent === 'Poison');
      fireEvent.click(poison);
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe('Ekans');
      fireEvent.click(buttons[0]);
      expect(pokemonName.textContent).toBe('Pikachu');
    });

    it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
      const { getAllByRole } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const buttons = getAllByRole('button');
      expect(buttons[0].textContent).toBe('All');
    });

    it('Testa se é criado um botão de filtro para cada tipo de Pokémon.', () => {
      const { getAllByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const button = getAllByTestId('pokemon-type-button');
      expect(button.length).toBe(2);
    });

    it('Próximo pokémon deve ser desabilitado quando tiver um só pokémon.', () => {
      const { getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const button = getByTestId('next-pokemon');
      expect(button.disabled).toBe(true);
    });
  });
});
