import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente Pokedex', () => {
  test('Teste se página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', {
      name: /Encountered pokémons/,
      level: 2,
    });

    expect(text).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const pok = getByText(/Pikachu/);
    expect(pok).toBeInTheDocument();

    const btn = getByRole('button', {
      name: /Próximo pokémon/,
    });

    userEvent.click(btn);

    const pok2 = getByText(/Charmander/);
    expect(pok2).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);

    const btns = getAllByTestId('pokemon-type-button');
    btns.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const eletric = getByRole('button', { name: /Electric/ });
    expect(eletric).toHaveTextContent('Electric');

    const fire = getByRole('button', { name: /Fire/ });
    expect(fire).toHaveTextContent('Fire');

    const bug = getByRole('button', { name: /Bug/ });
    expect(bug).toHaveTextContent('Bug');

    const poison = getByRole('button', { name: /Poison/ });
    expect(poison).toHaveTextContent('Poison');

    const psychic = getByRole('button', { name: /Psychic/ });
    expect(psychic).toHaveTextContent('Psychic');

    const normal = getByRole('button', { name: /Normal/ });
    expect(normal).toHaveTextContent('Normal');

    const dragon = getByRole('button', { name: /Dragon/ });
    expect(dragon).toHaveTextContent('Dragon');
  });

  test('Teste o botão All', () => {
    const { getByRole } = renderWithRouter(<App />);
    const allBtn = getByRole('button', {
      name: /All/,
    });

    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
  });
});
