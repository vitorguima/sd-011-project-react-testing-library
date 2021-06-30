import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const PokemonNameID = 'pokemon-name';

describe('Requisito 5 - componente Pokedex', () => {
  test('Contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2text = getByText(/Encountered pokémons/i);
    expect(h2text).toBeInTheDocument();
  });
  test('É exibido o próximo Pokémon da lista quando o botão', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByText(/Próximo pokémon/i);
    const pokemonName1 = getByTestId(PokemonNameID);
    fireEvent.click(buttonNext);
    const pokemonName2 = getByTestId(PokemonNameID);
    expect(pokemonName1).not.toContain(pokemonName2);
  });
  test('A Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  test('Botão All limpa todos os filtros', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    const pokemonName = getByTestId(PokemonNameID);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('Contém butões de tipo', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const buttonsType = queryAllByTestId('pokemon-type-button');
    buttonsType.forEach((buttonType) => {
      expect(buttonType).toBeInTheDocument();
    });
  });
  test('Se o botão de próximo pokemon é desabilitado', () => {
    const { queryAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttonsType = queryAllByTestId('pokemon-type-button');
    const buttonNext = getByTestId('next-pokemon');
    buttonsType.forEach((button) => {
      if (button.innerHTML === 'Electric') {
        fireEvent.click(button);
      }
    });
    expect(buttonNext.disabled).toBe(true);
  });
});
