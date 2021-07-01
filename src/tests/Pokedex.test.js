import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import { About } from '../components';
import pokemons from '../data';
import App from '../App';
// import { RuleTester } from 'eslint';

test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  const { getByRole } = renderWithRouter(<App />);
  const titleH2 = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
  expect(titleH2).toBeInTheDocument();
});

describe('Teste se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnNext = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNext).toBeInTheDocument();
  });

  test('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const btnNext = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(btnNext);
    });
  });

  test('O primeiro Pokémon da lista deve ser mostrado após o último da lista', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const btnNext = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(btnNext);
    });
    const firstPoke = getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();
  });
});

// Teste se a Pokédex tem os botões de filtro.
test('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getByRole } = renderWithRouter(<App />);
  pokemons.forEach(({ type }) => {
    const btnType = getByRole('button', { name: type });
    expect(btnType).toBeInTheDocument();
  });
});

test('Com a seleção do botão de um tipo deve-se passar pelos pokémons desse tipo', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const btnType = getByRole('button', { name: 'Fire' });
  fireEvent.click(btnType);
  expect(getByTestId('pokemon-type')).toHaveTextContent('Fire'); // verifico o texto no elemento html
  const btnNext = getByRole('button', { name: /Próximo pokémon/i });
  fireEvent.click(btnNext);
  expect(getByTestId('pokemon-type')).toHaveTextContent('Fire');
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  // O texto do botão deve ser All;
  const { getByRole } = renderWithRouter(<App />);
  const allBtn = getByRole('button', { name: /All/i });
  expect(allBtn).toBeInTheDocument();
});

test(' Pokedéx deverá mostrar os Pokémons quando o botão All for clicado', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const btnNext = getByRole('button', { name: /Próximo pokémon/i });
  const allBtn = getByRole('button', { name: /All/i });
  fireEvent.click(allBtn);
  pokemons.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(btnNext);
  });
});

// Para esta etapa eu consultei o repositório de Mauricio Shoiti Ieri
//* Fonte: https://github.com/tryber/sd-011-project-react-testing-library/pull/95 */
test('Teste se é criado, um botão de filtro para cada tipo de Pokémon.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const allPokemonTypes = pokemons.map((pokemon) => pokemon.type);
  const allButtonTypes = getAllByTestId('pokemon-type-button');
  allButtonTypes.forEach((button) => {
    allPokemonTypes.includes(button.textContent);
  });
});

// O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon
