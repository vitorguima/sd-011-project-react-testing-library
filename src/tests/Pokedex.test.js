import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Pokedex tests', () => {
  const pokemonOverview = '.pokemon-overview';
  const pPokemon = 'Próximo pokémon';
  const pTypes = [
    'Psychic', 'Fire', 'Dragon', 'Bug', 'Poison', 'Electric', 'Normal',
  ];
  test('Verifica se página contém um h2 contendo Encountered pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const heading = getAllByRole('heading');

    expect(heading[1].textContent).toBe('Encountered pokémons');
  });

  test('Verifica se é exibido o próximo Pokémon', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const fPokemon = container.querySelector(pokemonOverview).firstChild;
    const btnProximo = getByText(pPokemon);

    fireEvent.click(btnProximo);
    const nextPokemon = container.querySelector(pokemonOverview).firstChild.textContent;
    expect(fPokemon).not.toBe(nextPokemon);

    const btnAll = getByText('All');
    fireEvent.click(btnAll);

    data.forEach((pokemon, index) => {
      fireEvent.click(btnProximo);
      const myPokemon = container.querySelectorAll(pokemonOverview);
      expect(pokemon.name).not.toBe(fPokemon.textContent);
      if (index !== data.length - 1) {
        const dataPokemon = data[index + 1].name;
        expect(getByText(dataPokemon)).toBeInTheDocument();
      }
      expect(myPokemon).toHaveLength(1);
    });
    expect(fPokemon).toBeInTheDocument();
  });

  test('Verifica se a Pokédex tem filtros', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const bPsychic = getByText('Psychic');
    fireEvent.click(bPsychic);
    const btnProximo = getByText(pPokemon);
    const pokemonOnScreen = container.querySelector(pokemonOverview);

    fireEvent.click(btnProximo);
    expect(pokemonOnScreen.firstChild.nextSibling.textContent)
      .toBe(bPsychic.textContent);
    fireEvent.click(btnProximo);
    expect(pokemonOnScreen.firstChild.nextSibling.textContent)
      .toBe(bPsychic.textContent);
  });

  test('Verifica se há um botão de filtro para cada type', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    pTypes.forEach((type) => {
      const buttonsType = getAllByTestId('pokemon-type-button');
      const quantityType = buttonsType
        .filter((el) => el.textContent === type);
      expect(quantityType).toHaveLength(1);
    });
  });

  test('Verifica se o botão next é desabilitado quando só há 1 pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const typeB = getByText('Bug');
    fireEvent.click(typeB);

    const nextPokemon = getByText(pPokemon);
    expect(nextPokemon).toBeDisabled();
  });
});
