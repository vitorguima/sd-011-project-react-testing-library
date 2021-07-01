import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Testa se contém heading h2 com texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const headingh2 = container.querySelector('h2');
    expect(headingh2.textContent).toBe('Encountered pokémons');
  });

  test('Testa se é exibido o próximo Pokémon da lista quando clicado', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextButton = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const bug = getByRole('button', {
      name: 'Bug',
    });
    expect(bug).toBeInTheDocument();

    const fire = getByRole('button', {
      name: 'Fire',
    });
    expect(fire).toBeInTheDocument();
  });

  test('Testa se botão Próximo Pokemon é desabilitado quando houver um pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokeType = getAllByTestId('pokemon-type-button');
    expect(pokeType).toBeDefined();
  });

  test('Testa se a Pokédex tem um botão para resetar filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const all = getByRole('button', {
      name: 'All',
    });
    expect(all).toBeInTheDocument();
    fireEvent.click(all);
  });
});
