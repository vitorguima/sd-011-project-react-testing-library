import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing the "Pokedex" component', () => {
  it('Tests if page contains "Encountered pokemons" text', () => {
    renderWithRouter(<App />);

    const textInPage = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(textInPage).toBeInTheDocument();
  });

  it('Tests if clicking the "Next Pokemon" button shows the next Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const contentText = getByText(/Próximo pokémon/i);
    expect(contentText).toBeInTheDocument();
  });

  it('Tests if the "Pokédex" contains a button to "reset the filter"', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/All/i));
  });

  it('Test if the "Pokédex" has the filter buttons', () => {
    const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(<App />);
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

    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
});
