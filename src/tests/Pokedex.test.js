import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const pokemonOverview = '.pokemon-overview';
  const proximoPokemon = 'Próximo pokémon';
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const heading = getAllByRole('heading');
    expect(heading[1].textContent).toBe('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const firstPokemon = container.querySelector(pokemonOverview)
      .firstChild;
    const btnProximo = getByText(proximoPokemon);
    fireEvent.click(btnProximo);
    const nextPokemon = container.querySelector(pokemonOverview)
      .firstChild.textContent;
    expect(firstPokemon).not.toBe(nextPokemon);

    const btnAll = getByText('All');
    fireEvent.click(btnAll);

    /* Lembrar de referenciar o Vinicius... */

    data.forEach((pokemon, index) => {
      fireEvent.click(btnProximo);
      const atualPokemon = container.querySelectorAll(pokemonOverview);
      expect(pokemon.name).not.toBe(firstPokemon.textContent);
      if (index !== data.length - 1) {
        const dataPokemon = data[index + 1].name;
        expect(getByText(dataPokemon)).toBeInTheDocument();
      }
      expect(atualPokemon).toHaveLength(1);
    });
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const btnPsychic = getByText('Psychic');
    fireEvent.click(btnPsychic);
    const pokemonOnScreen = container.querySelector(pokemonOverview);
    const btnProximo = getByText(proximoPokemon);
    fireEvent.click(btnProximo);
    expect(pokemonOnScreen.firstChild.nextSibling.textContent)
      .toBe(btnPsychic.textContent);
    fireEvent.click(btnProximo);
    expect(pokemonOnScreen.firstChild.nextSibling.textContent)
      .toBe(btnPsychic.textContent);
  });

  const pokemonTypes = [
    'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal',
  ];

  it('Deve existir um botão de filtragem para cada tipo de Pokémon disponível', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    pokemonTypes.forEach((type) => {
      const allButtonTypes = getAllByTestId('pokemon-type-button');
      const quantityType = allButtonTypes
        .filter((buttonType) => buttonType.textContent === type);
      expect(quantityType).toHaveLength(1);
    });
  });

  it('O botão Próximo pokémon deve ser desabilitado quando tiver um só pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const typeBug = getByText('Bug');
    fireEvent.click(typeBug);
    const nextPokemon = getByText(proximoPokemon);
    expect(nextPokemon).toBeDisabled();
  });
});
