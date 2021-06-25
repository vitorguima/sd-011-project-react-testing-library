import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex, requisito 5', () => {
  it('Teste se página contém um heading h2 com o texto', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: /encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const {  queryByText } = renderWithRouter(<App />);
    const btn = queryByText('Próximo pokémon'); // buscando o botao

    expect(btn.innerHTML).toBe('Próximo pokémon'); // define o que espera se do texto do botao
    fireEvent.click(btn);
    expect(queryByText('Pikachu')).not.toBeInTheDocument(); // espera que apos o clique, o pokemon seja outro
    const pokemons = 9;

    for (let index = 0; index < pokemons - 1; index += 1) fireEvent.click(btn); // simula 8 cliques para voltar pro primeiro pokemon

    expect(queryByText('Pikachu')).toBeInTheDocument(); // testa se realmente voltou ao 1 pokemon
  });

  it('Verifica se somente um pokemon é renderizado por vez', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemons = getAllByText(/kg/i);

    expect(pokemons.length).toBe(1);
  });

  it('Testa se a pokedex tem os botões de filtro', () => {
    const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(<App />);
    const btnList = getAllByTestId('pokemon-type-button');
    const pokeTypes = 7;
    expect(btnList.length).toBe(pokeTypes); //
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const allBtn = getByRole('button', { name: /all/i });

    fireEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
  });

  it('Testa os botões de filtro', () => {
    const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(<App />);
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
});
