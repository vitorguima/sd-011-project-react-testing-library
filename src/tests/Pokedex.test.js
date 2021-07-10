import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('<Pokedex /> component test', () => {
  it('contains a heading h2 with the text Encountered pokemons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { level: 2 }).innerHTML;
    expect(h2).toBe('Encountered pokémons');
  });

  it('Displays the next Pokémon in the list when the Next Pokémon button is clicked',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const btn = getByText(/Próximo pokémon/);
      userEvent.click(btn);
      const next = getByText(/Charmander/);
      expect(next).toBeInTheDocument();
    });

  it('Pokédex has filter buttons', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);

    const filterFire = getByText(/Fire/);
    userEvent.click(filterFire);

    const pokemonType = getByTestId('pokemon-type').innerHTML;
    const pokemonTypeButton = getAllByTestId('pokemon-type-button');
    expect(pokemonType).toBe(pokemonTypeButton[1].innerHTML);

    const charmander = getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();

    const btnNext = getByText(/Próximo pokémon/);
    userEvent.click(btnNext);

    const rapidash = getByText(/Rapidash/);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(btnNext);
    expect(charmander).toBeInTheDocument();
  });

  it('Contains a button to reset the filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText(/All/);
    expect(btnAll).toBeInTheDocument();

    const btnBug = getByText(/Bug/);
    userEvent.click(btnBug);
    const caterpie = getByText(/Caterpie/);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(btnAll);
    const pikachu = getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();

    const btnNext = getByText(/Próximo pokémon/);
    userEvent.click(btnNext);
    const charmander = getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  });

  it('Dynamically creates a filter button for each type of Pokémon', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const fire = getByText(/Fire/);
    expect(fire).toBeInTheDocument();

    const psychic = getByText(/Psychic/);
    expect(psychic).toBeInTheDocument();

    const electric = getAllByText(/Electric/);
    expect(electric.length).toBe(2);

    const bug = getByText(/Bug/);
    expect(bug).toBeInTheDocument();

    const poison = getByText(/Poison/);
    expect(poison).toBeInTheDocument();

    const dragon = getByText(/Dragon/);
    expect(dragon).toBeInTheDocument();

    const normal = getByText(/Normal/);
    expect(normal).toBeInTheDocument();
  });

  it('Next Pokémon button disabled when Pokémon filtered list has only one Pokémon',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const bug = getByText(/Bug/);
      userEvent.click(bug);

      const next = getByText(/Próximo pokémon/);
      expect(next).toBeDisabled();

      const psychic = getByText(/Psychic/);
      userEvent.click(psychic);
      expect(next).toBeEnabled();
    });
});
