import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requisito 5', () => {
  it('if heading has the correct text', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokedexHeading = getByText(/encountered pokémons/i);
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('if theres a button with text "Próximo pokémon"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn).toHaveTextContent(/próximo pokémon/i);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getAllByRole } = renderWithRouter(<App />);
    const typesPokemon = 7;
    const button = getAllByTestId('pokemon-type-button');
    expect(button).toHaveLength(typesPokemon);

    const electric = getAllByRole('button', {
      name: /electric/i,
    });

    const fire = getAllByRole('button', {
      name: /fire/i,
    });

    const bug = getAllByRole('button', {
      name: /bug/i,
    });

    const poison = getAllByRole('button', {
      name: /poison/i,
    });

    const psychic = getAllByRole('button', {
      name: /psychic/i,
    });

    const normal = getAllByRole('button', {
      name: /normal/i,
    });

    const dragon = getAllByRole('button', {
      name: /dragon/i,
    });

    expect(electric).toHaveLength(1);
    expect(fire).toHaveLength(1);
    expect(bug).toHaveLength(1);
    expect(poison).toHaveLength(1);
    expect(psychic).toHaveLength(1);
    expect(normal).toHaveLength(1);
    expect(dragon).toHaveLength(1);
  });

  it('if theres a all text', () => {
    const { getByText } = renderWithRouter(<App />);
    const allText = getByText(/all/i);

    expect(allText).toBeInTheDocument();
  });

  it('if is filtered', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    fireEvent.click(buttonAll);

    expect(buttonAll).toBeInTheDocument();
  });
});
