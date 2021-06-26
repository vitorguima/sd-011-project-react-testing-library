import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRoute';
import pokemons from '../data';
import App from '../App';

describe('Requisito 05', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const element = container.querySelector('h2');
    expect(element.textContent).toBe('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btn = getByTestId('next-pokemon');
    expect(btn.textContent).toBe('Próximo pokémon');
  });

  it('Próximos Pokémons da lista devem ser mostrados, um a um', () => {
    const pokemon = pokemons.map(({ name }) => name);
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const btn = getByTestId('next-pokemon');
    pokemon.forEach((pokemo) => {
      expect(getByText(pokemo)).toBeInTheDocument();
      fireEvent.click(btn);
    });
    expect(getByText('Pikachu')).toBeInTheDocument(); // testando se o primeiro aparece depois que aperta o botão do ultimo pokemon da lista
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const pokemon = pokemons.map(({ name }) => name);
    const { getByText } = renderWithRouter(<App />);
    const all = getByText(/All/i);
    const btn = getByText(/Próximo pokémon/i);
    fireEvent.click(all);
    pokemon.forEach((poke) => {
      expect(getByText(poke)).toBeInTheDocument();
      fireEvent.click(btn);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste um botão de filtro para cada tipo de Pokémon.', () => {
    const pokemon = pokemons.map(({ type }) => type);
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterbtn = getAllByTestId('pokemon-type-button');
    const typeBtn = filterbtn.map((btnType) => btnType.textContent);
    const checkFilter = pokemon.every((type) => typeBtn.includes(type));
    expect(checkFilter).toBe(true); //
  });
});
