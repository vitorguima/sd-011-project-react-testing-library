import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Pokedex tests', () => {
  const pokemonOverview = '.pokemon-overview';
  const nextPokemon = 'Próximo pokémon';
  const pokemonTypes = [
    'Psychic', 'Fire', 'Dragon', 'Bug', 'Poison', 'Electric', 'Normal',
  ];
  test('Tests if the page contains a heading h2 with the text "Encountered pokemons"',
    () => {
      const { getAllByRole } = renderWithRouter(<App />);
      const getHeading = getAllByRole('heading');

      expect(getHeading[1].textContent).toBe('Encountered pokémons');
    });

  test('Tests if the next Pokémon is displayed when the Next Pokémon button is clicked',
    () => {
      const { getByText, container } = renderWithRouter(<App />);
      const pokemonFiltre = container.querySelector(pokemonOverview).firstChild;
      const buttonNext = getByText(nextPokemon);

      fireEvent.click(buttonNext);
      const nPokemon = container.querySelector(pokemonOverview).firstChild.textContent;
      expect(pokemonFiltre).not.toBe(nPokemon);

      const buttonAll = getByText('All');
      fireEvent.click(buttonAll);

      data.forEach((pokemon, index) => {
        fireEvent.click(buttonNext);
        const thePokemon = container.querySelectorAll(pokemonOverview);
        expect(pokemon.name).not.toBe(pokemonFiltre.textContent);
        if (index !== data.length - 1) {
          const pokemonInfo = data[index + 1].name;
          expect(getByText(pokemonInfo)).toBeInTheDocument();
        }
        expect(thePokemon).toHaveLength(1);
      });
      expect(pokemonFiltre).toBeInTheDocument();
    });

  test('Tests if the Pokédex has the filter buttons',
    () => {
      const { getByText, container } = renderWithRouter(<App />);
      const psychichPokemon = getByText('Psychic');
      fireEvent.click(psychichPokemon);
      const buttonNext = getByText(nextPokemon);
      const renderedPokemon = container.querySelector(pokemonOverview);

      fireEvent.click(buttonNext);
      expect(renderedPokemon.firstChild.nextSibling.textContent)
        .toBe(psychichPokemon.textContent);
      fireEvent.click(buttonNext);
      expect(renderedPokemon.firstChild.nextSibling.textContent)
        .toBe(psychichPokemon.textContent);
    });

  test('Tests if there is a filter button for each Pokemon type',
    () => {
      const { getAllByTestId } = renderWithRouter(<App />);

      pokemonTypes.forEach((type) => {
        const buttonsType = getAllByTestId('pokemon-type-button');
        const typeAmount = buttonsType
          .filter((el) => el.textContent === type);
        expect(typeAmount).toHaveLength(1);
      });
    });

  test('Tests if the button "next" is disabled when there is a single pokemon',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const type = getByText('Bug');
      fireEvent.click(type);

      const nPokemon = getByText(nextPokemon);
      expect(nPokemon).toBeDisabled();
    });
});
