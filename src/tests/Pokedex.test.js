import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('tests Pokedex component', () => {
  const nextPokemon = 'Próximo pokémon';

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  it('check next pokemon button', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(nextPokemon);
    expect(nextPokemonButton).toBeInTheDocument();
    fireEvent.click(nextPokemonButton);
    const nextRenderedPokemon = getByText('Charmander');
    expect(nextRenderedPokemon).toBeInTheDocument();
    const renderedPokemons = getAllByText('Charmander');
    const totalOfRenderedPokemons = 1;
    expect(renderedPokemons.length).toEqual(totalOfRenderedPokemons);
  });

  it('check if the filter button is working', () => {
    const { getByText } = renderWithRouter(<App />);
    const fireButton = getByText('Fire');
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);
    const nextPokemonButton = getByText(nextPokemon);
    fireEvent.click(nextPokemonButton);
    const nextRenderedPokemon = getByText('Rapidash');
    expect(nextRenderedPokemon).toBeInTheDocument();
  });

  it('check filtered buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    const filtersAmount = 7;
    expect(filterButtons.length).toEqual(filtersAmount);
  });

  it('check if next pokemon button is disabled if there is only one pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const normalFilterButton = getByText('Normal');
    expect(normalFilterButton).toBeInTheDocument();
    fireEvent.click(normalFilterButton);
    const nextPokemonButton = getByText(nextPokemon);
    expect(nextPokemonButton).toBeDisabled();
  });

  it('check if next pokemon button is disabled if there is only one pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const normalFilterButton = getByText('Normal');
    fireEvent.click(normalFilterButton);
    expect(getByText('Snorlax')).toBeInTheDocument();
    const allFilterButton = getByText('All');
    fireEvent.click(allFilterButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
