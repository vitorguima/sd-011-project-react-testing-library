import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const buttonNext = (getByText) => getByText('Próximo pokémon');

describe('testing Pokedex component', () => {
  test('contain a heading h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading2 = getByRole('heading', { level: 2 });
    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent('Encountered pokémons');
  });

  test('shows next pokemon when the button is clicked', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    const buttonType = getAllByTestId('pokemon-type-button')[1];
    expect(buttonType).toBeInTheDocument();
    userEvent.click(buttonType);

    expect(getByText(/charmander/i)).toBeInTheDocument();

    expect(buttonNext(getByText)).toBeInTheDocument();
    userEvent.click(buttonNext(getByText));

    expect(getByText(/rapidash/i)).toBeInTheDocument();

    userEvent.click(buttonNext(getByText));
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  test('shows only one pokemon', () => {
    const { getByText, container } = renderWithRouter(<App />);

    const pokemonsShown = container.querySelectorAll('.pokemon');
    expect(pokemonsShown.length).toBe(1);

    userEvent.click(buttonNext(getByText));
    expect(pokemonsShown.length).toBe(1);
  });

  test('testing filter buttons', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    const typesPokemon = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    for (let index = 0; index < typesPokemon; index += 1) {
      const button = getAllByTestId('pokemon-type-button')[index];
      expect(button).toBeInTheDocument();
      const filteredPokemons = pokemons.filter(
        (pokemon) => pokemon.type === typesPokemon[index],
      );
      filteredPokemons.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        expect(button).toHaveValue(pokemon.type);
        userEvent.click(button);
      });
    }
  });

  test('testing button All', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonNext(getByText)).toBeInTheDocument();

    const checksButtonAll = () => {
      pokemons.forEach((pokemon) => {
        const pokemonName = getByText(pokemon.name);
        expect(pokemonName).toBeInTheDocument();
        userEvent.click(buttonNext(getByText));
      });
    };

    checksButtonAll();
    userEvent.click(buttonAll);
    checksButtonAll();
  });

  test('button to next pokemon must be disabled', () => {
    const { getByText } = renderWithRouter(<App />);

    const buttonType = getByText(/Bug/i);
    expect(buttonType).toBeInTheDocument();

    expect(buttonNext(getByText)).toBeInTheDocument();
    expect(buttonNext(getByText).disabled).toBe(false);

    userEvent.click(buttonType);

    expect(buttonNext(getByText).disabled).toBe(true);
  });
});
