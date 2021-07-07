import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Testes do componente "Pokedex"', () => {
  const nextPokemon = 'next-pokemon';
  const pokemon = 'pokemon-name';
  const pokemonTypeButton = 'pokemon-type-button';

  it('Teste se página contém um heading "h2" com o texto "Encountered pokémons".',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const heading = getByText('Encountered pokémons');
      expect(heading).toBeInTheDocument();
    });

  describe('Teste se é exibido o próximo Pokémon quando o botão Próximo é clicado.',
    () => {
      it('O botão deve conter o texto "Próximo pokémon"', () => {
        const { getByTestId } = renderWithRouter(<App />);
        const buttonNext = getByTestId(nextPokemon);
        expect(buttonNext.textContent).toBe('Próximo pokémon');
      });

      it('Os próximos Pokémons devem ser mostrados ao clicar no botão', () => {
        const { getByTestId } = renderWithRouter(<App />);
        const buttonNext = getByTestId(nextPokemon);
        const pokemonName = getByTestId(pokemon);

        expect(pokemonName.textContent).toBe('Pikachu');

        userEvent.click(buttonNext);

        expect(pokemonName.textContent).toBe('Charmander');
      });

      it('Se estiver no último Pokémon, ao clicar em próximo vai para o primeiro', () => {
        const { getByTestId } = renderWithRouter(<App />);
        const buttonNext = getByTestId(nextPokemon);
        const pokemonName = getByTestId(pokemon);

        while (pokemonName.textContent !== 'Dragonair') {
          userEvent.click(buttonNext);
        }

        userEvent.click(buttonNext);
        expect(pokemonName.textContent).toBe('Pikachu');
      });
    });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId(nextPokemon);
    const pokemonName = getAllByTestId(pokemon);

    expect(pokemonName.length).toBe(1);

    userEvent.click(buttonNext);

    expect(pokemonName.length).toBe(1);
  });

  describe('Teste se a Pokédex tem os botões de filtro.', () => {
    it('A partir da seleção de um tipo deve circular apenas por aquele tipo;', () => {
      const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
      const buttonNext = getByTestId(nextPokemon);
      const buttonFilter = getAllByTestId(pokemonTypeButton);
      const pokemonName = getByTestId(pokemon);

      userEvent.click(buttonFilter[4]);

      expect(pokemonName.textContent).toBe('Alakazam');
      userEvent.click(buttonNext);
      expect(pokemonName.textContent).toBe('Mew');
      userEvent.click(buttonNext);
      expect(pokemonName.textContent).toBe('Alakazam');
    });

    it('O texto do botão deve corresponder ao "nome do tipo", ex. "Psychic"', () => {
      const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
      const buttonFilter = getAllByTestId(pokemonTypeButton);
      const pokemonType = getByTestId('pokemon-type');

      userEvent.click(buttonFilter[3]);
      expect(buttonFilter[3].textContent).toBe(pokemonType.textContent);
    });
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All', () => {
      const { getByText } = renderWithRouter(<App />);
      const buttonAll = getByText(/All/i);

      expect(buttonAll.textContent).toBe('All');
    });

    it('A Pokedéx deverá mostrar os Pokémons normalmente quando All for clicado', () => {
      const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);
      const buttonAll = getByText(/All/i);
      const buttonFilter = getAllByTestId(pokemonTypeButton);
      const buttonNext = getByTestId(nextPokemon);
      const pokemonName = getByTestId(pokemon);

      userEvent.click(buttonFilter[4]);
      expect(pokemonName.textContent).toBe('Alakazam');
      userEvent.click(buttonAll);
      expect(pokemonName.textContent).toBe('Pikachu');
      userEvent.click(buttonNext);
      expect(pokemonName.textContent).toBe('Charmander');
    });
  });
});
