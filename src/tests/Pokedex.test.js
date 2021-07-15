import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';

describe('testando componente pokédex', () => {
  it('testando se há um h2', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent(/Encountered pokémons/i);
  });

  it('testa botão próximo', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const prox = getByText(/Próximo pokémon/i);
    fireEvent.click(prox);
    const fire = getByText(/Charmander/i);
    expect(fire).toBeInTheDocument();
    data.forEach((_pokemon, index) => {
      if (index !== data.length - 1) {
        fireEvent.click(prox);
      }
    });
    const firstPokemon = getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('testa se aparece 1 pok por vez', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const average = getAllByText(/Average weight/i);
    expect(average.length).toBe(1);
  });

  it('testando se há botões de tipo', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btns = getAllByTestId('pokemon-type-button');
    const qtd = 7;
    expect(btns.length).toBe(qtd);
  });

  it('testando se botões de tipo correspondem aos poks', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const psychic = getByText(/Psychic/i);
    fireEvent.click(psychic);
    const alak = getByText(/Alakazam/i);
    fireEvent.click(alak);
    expect(alak).toBeInTheDocument();
    const prox = getByText(/Próximo pokémon/i);
    fireEvent.click(prox);
    const mew = getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
  });

  it('testa se botão all reseta filtros', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnAll = getByRole('button', { name: 'All' });
    fireEvent.click(btnAll);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('existe um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const qtd = 7;
    const btns = getAllByTestId('pokemon-type-button');
    expect(btns.length).toBe(qtd);
  });
});
