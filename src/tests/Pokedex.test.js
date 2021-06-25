import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testes relacionados ao componente Pokedex', () => {
  const next = 'Próximo pokémon';
  it('Verifica se a página contém um h2 com o texto "Encountered pokémons"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const h2 = 'Encountered pokémons';
    expect(getByText(h2)).toBeInTheDocument();
  });

  it('O próximo Pokemon deve ser exibido ao clicar no botão "Próximo pokémon"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText(next);
    expect(btn).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();

    fireEvent.click(btn);
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Caterpie')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Ekans')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Mew')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Rapidash')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Snorlax')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Dragonair')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um pokemon por vez"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const btn = getByText('Próximo pokémon');
    pokemons.forEach(() => {
      const thePokemon = document.querySelectorAll('.pokemon');
      expect(thePokemon.length).toBe(1);
      fireEvent.click(btn);
    });
  });

  it('Verifica se existem os botões de filtro" e se seu texto está correto', () => {
    const { getAllByText, getAllByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const typeButtons = getAllByTestId('pokemon-type-button');
    const magicNumber = 8;
    const buttons = document.querySelectorAll('.filter-button');
    const checkTypeName = (param) => {
      const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      return types.some((type) => type === param);
    };

    expect(buttons.length).toBe(magicNumber);
    expect(buttons[0].innerHTML).toBe('All');

    typeButtons.forEach((button) => {
      fireEvent.click(button);
      expect(getAllByText(button.innerHTML).length).toBeGreaterThan(1);
      expect(checkTypeName(button.innerHTML)).toBe(true);
    });
  });

  it('Verifica se All e "Próximo" funcionam corretamente', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const all = getByText('All');
    const nextPokemon = getByText(next);
    const name = getByTestId('pokemon-name');

    fireEvent.click(all);
    expect(name.innerHTML).toBe('Pikachu');

    pokemons.forEach((pokemon) => {
      expect(pokemon.name).toBe(name.innerHTML);
      fireEvent.click(nextPokemon);
    });
  });
});
