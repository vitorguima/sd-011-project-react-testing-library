import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import Data from '../data';
import renderWithRouter from '../renderWithRouter';

const namePokemons = Data.map(({ name }) => name);
const typePokemons = Data.map(({ type }) => type);

describe('Testa o componente <Pokedex.js />', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.querySelector('h2').textContent).toBe('Encountered pokémons');
  });

  it('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    const Button = getByText('Próximo pokémon');
    expect(Button).toBeInTheDocument();

    namePokemons.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(Button);
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const mapButton = getAllByTestId('pokemon-type-button').map((b) => b.textContent);
    expect(typePokemons.every((type) => mapButton.includes(type))).toBeTruthy();
  });

  it('se renderiza todos os pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));

    namePokemons.forEach((Pokemon) => {
      expect(getByText(Pokemon)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
