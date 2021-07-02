import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

const pokemonNext = 'Próximo pokémon';
const pokemonTypeTest = 'pokemon-type';

describe('Requisito 5 - Pokedex', () => {
  it('Se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const headingH2 = getByText('Encountered pokémons');
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');
  });

  it('se é exibido o próximo Pokémon, quando o botão Próximo pokémon é clicado.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const nextPokemon = getByText(pokemonNext);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonCard = container.querySelectorAll('.pokemon');
    expect(pokemonCard.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const filterBtns = getAllByTestId('pokemon-type-button');
    filterBtns.forEach((filterBtn) => {
      fireEvent.click(filterBtn);
      const pokemonType = getByTestId(pokemonTypeTest).textContent;
      expect(pokemonType).toBe(filterBtn.textContent);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allBtn = getByText('All');
    expect(allBtn.textContent).toBe('All');

    fireEvent.click(allBtn);
    const nextPokemon = getByText(pokemonNext);

    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
