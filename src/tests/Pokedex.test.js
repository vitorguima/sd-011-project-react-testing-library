import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWhithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const idN = 'pokemon-name';

describe('Requisito 05 Pokedex', () => {
  it('Deve conter um heading com o texto `Encountered pokémons`', () => {
    const { getByRole } = renderWhithRouter(<App />);

    const heading = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(heading).toBeInTheDocument();
  });

  it('Deve exibir proximo pokémon ao clicar no botão', () => {
    const { getByRole, getByTestId } = renderWhithRouter(<App />);

    const btn = getByRole('button', { name: /Próximo pokémon/ });
    const namePokemon = getByTestId(idN).textContent;
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByTestId(idN)).not.toHaveTextContent(namePokemon);
  });

  it('Deve mostrar o primeiro pokemon da lista se estiver no ultimo', () => {
    const { getByRole, getByTestId } = renderWhithRouter(<App />);

    const btnType = getByRole('button', { name: /Fire/ });
    const pokeType = getByTestId('pokemon-type');
    const button = getByRole('button', { name: /Próximo pokémon/ });

    fireEvent.click(btnType);
    expect(pokeType).toHaveTextContent(btnType.textContent);

    const pokeName = getByTestId(idN).textContent;
    fireEvent.click(button);
    expect(getByTestId(idN)).not.toHaveTextContent(pokeName);
    fireEvent.click(button);
    expect(getByTestId(idN)).toHaveTextContent(pokeName);
  });

  it('Deve exibir um pokemon por vez', () => {
    const { getByRole, getAllByRole } = renderWhithRouter(<App />);

    const btnType = getByRole('button', { name: /Bug/ });
    fireEvent.click(btnType);
    const detailsPoke = getAllByRole('link', { name: /More details/ });
    expect(detailsPoke.length).toEqual(1);
  });

  it('Deve conter um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWhithRouter(<App />);

    const btnAll = getByRole('button', { name: /All/ });
    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnAll);
    const pokeName = getByTestId(idN);
    expect(pokeName).toHaveTextContent('Pikachu');
  });

  it('Deve conter um botão dinamicamente para cada tipo de pokemon', () => {
    const { getAllByTestId } = renderWhithRouter(<App />);

    const btnType = getAllByTestId('pokemon-type-button');
    const dataType = data.reduce((acc, { type }) => {
      if (!acc.includes(type)) acc.push(type);
      return acc;
    }, []);

    expect(btnType).toHaveLength(dataType.length);
  });
});
