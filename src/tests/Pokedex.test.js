import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, cleanup } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

function clicksToNextPokemon({ nextPokemonButton, clicks }) {
  for (let index = 0; index < clicks; index += 1) {
    fireEvent.click(nextPokemonButton);
  }
}

const nextPokemon = 'next-pokemon';

describe('Pokedex tests', () => {
  it('renders heading "Encontered pokémons"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('should render next pokémon on "Próximo pokémon" click', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemonButton = getByTestId(nextPokemon);
    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');

    fireEvent.click(nextPokemonButton);
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    expect(getByText('Caterpie')).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    expect(getByText('Ekans')).toBeInTheDocument();

    const clicksAlreadyDone = 3;

    const objetToClicks = {
      nextPokemonButton,
      clicks: pokemons.length - clicksAlreadyDone,
    };

    clicksToNextPokemon(objetToClicks);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('should renders just one pokemon', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonContainer = getByText('Encountered pokémons').nextElementSibling;
    expect(pokemonContainer.childElementCount).toBe(2);

    const nextPokemonButton = getByTestId(nextPokemon);
    fireEvent.click(nextPokemonButton);
    expect(pokemonContainer.childElementCount).toBe(2);
  });

  it('should renders pokemons types filters buttons', () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const typesNumber = 7;

    const pokemonsTypesButtons = getAllByTestId('pokemon-type-button');
    expect(pokemonsTypesButtons).toHaveLength(typesNumber);

    expect(pokemonsTypesButtons[4]).toHaveTextContent('Psychic');
    fireEvent.click(pokemonsTypesButtons[4]);

    let type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Psychic');

    const nextPokemonButton = getByTestId(nextPokemon);
    fireEvent.click(nextPokemonButton);
    type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Psychic');
  });

  it('should render reset type filter button with "All" text', () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const buttons = getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('All');

    const objetToClicks = {
      nextPokemonButton: buttons[8],
      clicks: 5,
    };

    clicksToNextPokemon(objetToClicks);
    expect(getByText('Mew')).toBeInTheDocument();

    fireEvent.click(buttons[2]);
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(buttons[0]);
    expect(getByText('Pikachu')).toBeInTheDocument();

    objetToClicks.clicks = 4;

    clicksToNextPokemon(objetToClicks);
    expect(getByText('Alakazam')).toBeInTheDocument();
  });

  it('should disable "Próximo pokémon" button when have just one pokémon by type', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const bugTypeButton = getByText('Bug');
    fireEvent.click(bugTypeButton);
    const nextPokemonButton = getByTestId(nextPokemon);
    expect(nextPokemonButton).toBeDisabled();
  });
});
