import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemonsName = pokemons.map(({ name }) => name);
const buttonNext = 'Próximo pokémon';

describe('Testando o componente <Pokedex.js />', () => {
  it('Verifica se a página contém um h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2Heading = getByText('Encountered pokémons');
    expect(h2Heading).toBeInTheDocument();
    expect(h2Heading.tagName).toBe('H2');
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(buttonNext)).toBeInTheDocument();
    pokemonsName.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(getByText(buttonNext));
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um pokemon por vez', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const withoutPikachu = pokemonsName.filter((pokemon) => pokemon !== 'Pikachu');
    withoutPikachu.forEach((pokemon) => {
      expect(screen.queryByText(pokemon)).toBeNull();
    });
    fireEvent.click(getByText(buttonNext));
    const withoutCharmander = pokemonsName.filter((pokemon) => pokemon !== 'Charmander');
    withoutCharmander.forEach((pokemon) => {
      expect(screen.queryByText(pokemon)).toBeNull();
    });
  });

  it('Verifica se a Pokédex tem todos os botões de filtro', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokeTypes = [...new Set(pokemons.map(({ type }) => type)), 'All'];
    const allButtons = getAllByRole('button');
    const AllButtonTypes = allButtons.map((button) => button.textContent);
    expect(pokeTypes.every((type) => AllButtonTypes.includes(type))).toBeTruthy();
  });

  it('Se ao clicar em um botão circula somente por pokemons daquele tipo', () => {
    const { getByText } = renderWithRouter(<App />);
    const firePokemons = pokemons.filter(({ type }) => type === 'Fire');
    const firePokemonsName = firePokemons.map(({ name }) => name);
    fireEvent.click(getByText('Fire'));
    firePokemonsName.forEach((firePokemon) => {
      expect(getByText(firePokemon)).toBeInTheDocument();
      fireEvent.click(getByText(buttonNext));
    });
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(getByText('All'));
    pokemonsName.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(getByText(buttonNext));
    });
  });

  it('Verificando se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    pokemonsName.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(getByText(buttonNext));
    });
  });

  it('Verifica se os botões são criados dinâmicamente', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Normal'));
    expect(getByText(buttonNext)).toBeInTheDocument();
    expect(getByText(buttonNext).disabled).toBeTruthy();
  });

  it('Verifica se o botão All está sempre visível', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const AllButtons = getAllByTestId('pokemon-type-button');
    AllButtons.forEach((button) => {
      expect(getByText('All')).toBeInTheDocument();
      fireEvent.click(button);
    });
  });
});
