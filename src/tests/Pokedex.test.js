import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const pokemonNames = Data.map(({ name }) => name);
const pokemonsType = Data.map(({ type }) => type);

describe('Testa o funcionamento do componente <Pokedex />', () => {
  it('Testa se o contém um h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const headerPage = container.querySelector('h2');
    expect(headerPage.textContent).toBe('Encountered pokémons');
  });

  it('Testa se é exibido o próximo botão quando clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    pokemonNames.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Testa se tem botão de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId('pokemon-type-button');
    const typeButtonText = typeButton.map((button) => button.textContent);
    expect(pokemonsType.every((type) => typeButtonText.includes(type))).toBeTruthy();
  });

  it('Testa se tem um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText(/All/i);
    const nextButton = getByText(/Próximo pokémon/i);
    fireEvent.click(allButton);
    pokemonNames.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
