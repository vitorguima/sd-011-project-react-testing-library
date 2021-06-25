import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('5- Test <Pokedex.js /> component', () => {
  it('Should render a heading with "Encountered pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);

    expect(heading).toBeInTheDocument();
  });

  it('Should display a next pokémon when next button clicked', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextBtn = getByTestId('next-pokemon');

    expect(nextBtn).toHaveTextContent('Próximo pokémon');

    fireEvent.click(nextBtn);
    let nextPk = getByText(/charmander/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Caterpie/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Ekans/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Alakazam/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Mew/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Rapidash/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Snorlax/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    nextPk = getByText(/Dragonair/i);
    expect(nextPk).toBeInTheDocument();

    fireEvent.click(nextBtn);
    const lastPk = getByText(/pikachu/i);
    expect(lastPk).toBeInTheDocument();
  });

  it('Should display one pokémon at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const { length } = getAllByTestId('pokemon-name');

    expect(length).toBe(1);
  });

  it('Should have filter buttons by Pokemons Type', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
    const { length } = getAllByTestId('pokemon-type-button');
    const typeBtns = 7;

    expect(length).toBe(typeBtns);

    const psychicBtn = getByText('Psychic');
    fireEvent.click(psychicBtn);

    const psychicTypePkm = getByTestId('pokemon-type');
    expect(psychicTypePkm).toHaveTextContent('Psychic');
  });

  it('Should have a button to filter restart(all)', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText('All');

    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnAll);
    const pkm = getByText('Pikachu');
    expect(pkm).toBeInTheDocument();
  });

  it('Should have filter buttons by Pokemons Type', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeBtns = getAllByTestId('pokemon-type-button');

    expect(typeBtns[0]).toHaveTextContent('Electric');
    expect(typeBtns[1]).toHaveTextContent('Fire');
    expect(typeBtns[2]).toHaveTextContent('Bug');
    expect(typeBtns[3]).toHaveTextContent('Poison');
    expect(typeBtns[4]).toHaveTextContent('Psychic');
    expect(typeBtns[5]).toHaveTextContent('Normal');
    expect(typeBtns[6]).toHaveTextContent('Dragon');
  });

  it('Should disable the "next" button while displaying only one Pokemon', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const nextBtn = getByText(/Próximo pokémon/i);
    const electricBtn = getAllByText('Electric')[1];

    fireEvent.click(electricBtn);
    expect(nextBtn.disabled).toBe(true);
  });
});
