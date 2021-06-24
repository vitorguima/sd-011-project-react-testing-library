import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('5 - Testa o componente <Pokedex.js />', () => {
  const nextPokemonBtn = 'Próximo pokémon';
  it('Testa se página contém um heading h2 com o texto `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('O botão deve conter o texto `Próximo pokémon`',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      const clickNextBtn = getByRole('button', { name: nextPokemonBtn });
      expect(clickNextBtn).toBeInTheDocument();
    });

  it('Ao clicar, os próximos Pokémons da lista devem ser mostrados, um a um', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const clickNextBtn = getByRole('button', { name: nextPokemonBtn });
    expect(clickNextBtn).toBeInTheDocument();

    for (let count = 0; count < data.lenght; count += 1) {
      fireEvent.click(clickNextBtn);
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const { queryByText } = renderWithRouter(<App />);
    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
    expect(queryByText('Caterpie')).not.toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro que devem corresponder ao nome do tipo',
    () => {
      const { queryByText } = renderWithRouter(<App />);
      fireEvent.click(queryByText('Fire'));
      expect(queryByText('Charmander')).toBeInTheDocument();
      fireEvent.click(queryByText(nextPokemonBtn));
      expect(queryByText('Charmander')).not.toBeInTheDocument();
      expect(queryByText('Rapidash')).toBeInTheDocument();
    });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { queryByRole, queryByText } = renderWithRouter(<App />);
    fireEvent.click(queryByRole('button', { name: 'All' }));
    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('All')).toBeInTheDocument();
  });

  it('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.',
    () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const testId = (getAllByTestId('pokemon-type-button')[0]);
      expect(testId).toBeInTheDocument();
    });
});
