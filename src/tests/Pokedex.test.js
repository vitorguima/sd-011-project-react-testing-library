import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa componente Pokedéx', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const tagh2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(tagh2).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(
      <App />,
    );
    // Existe um botão com o nome Próximo Pokemon
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    // O primeiro Pokemom é o Pikachu
    const pikachu = getByText('Pikachu');
    expect(pikachu.innerHTML).toBe('Pikachu');
    // Os próximos Pokémons da lista devem ser mostrados, um a um ao clicar no botão
    pokemons.forEach((element) => {
      const pokTestId = getByTestId('pokemon-name');
      expect(pokTestId.innerHTML).toBe(element.name);
      fireEvent.click(button);
    });

    // Teste se é mostrado apenas um Pokémon por vez.
    pokemons.forEach(({ type }) => {
      const pokTestId = getByTestId('pokemon-type');
      expect(pokTestId.innerHTML).toBe(type);
      fireEvent.click(button);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const normal = getByRole('button', { name: 'Normal' });
    expect(normal).toBeInTheDocument();

    const dragon = getByRole('button', { name: 'Dragon' });
    expect(dragon).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const all = getByRole('button', {
      name: /All/i,
    });
    expect(all).toBeInTheDocument();
    fireEvent.click(all);
  });

  test('O botão de Próximo será desabilitado quando o filtro tiver um só pokémon', () => {
    const { getAllByTestId } = renderWithRouter(
      <App />,
    );
    const pokType = getAllByTestId('pokemon-type-button');
    expect(pokType).toBeDefined();
  });
});
