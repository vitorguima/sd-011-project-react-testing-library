import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const { queryByText } = renderWithRouter(<App />);
    expect(queryByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon quando o Próximo pokémon é clicado.', () => {
    const { getByTestId, queryByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByTestId('next-pokemon');
    const pokemon = queryByText(/Pikachu/);
    fireEvent.click(nextPokemonButton);
    expect(pokemon).toHaveTextContent('Charmander');
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    // const { getByTestId } = renderWithRouter(<App />);
    // fireEvent.click();
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getByText } = renderWithRouter(<App />);
    const typeButton = getByText('Fire');
    fireEvent.click(typeButton);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText('All');
    fireEvent.click(getByText('Fire'));
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(allButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Testa se é criado botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemonTypes = data.reduce((acc, { type }) => {
      if (acc.some((element) => element === type)) {
        return acc;
      }
      acc.push(type);
      return acc;
    }, []);

    const typeButtonList = getAllByTestId('pokemon-type-button');

    typeButtonList
      .forEach((button) => {
        expect(button.textContent)
          .toContain(pokemonTypes.filter((type) => type === button.textContent));
      });
  });

  it('O botão de Próximo deve ser desabilitado quando a lista tiver um pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/);
    expect(nextButton).toBeEnabled();
    fireEvent.click(getByText('Poison'));
    expect(nextButton).toBeDisabled();
  });
});
