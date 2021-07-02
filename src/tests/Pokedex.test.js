import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const checkH2 = getAllByRole('heading');
    expect(checkH2[1].textContent).toBe('Encountered pokémons');
  });

  it('O próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    const { getByText } = renderWithRouter(<App />);
    const checkButton = getByText(/Próximo pokémon/i);
    expect(checkButton).toBeInTheDocument();

    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    fireEvent.click(checkButton);

    expect(getByText(/Charmander/)).toBeInTheDocument();

    const rest = 8;

    for (let i = 0; i < rest; i += 1) {
      fireEvent.click(checkButton);
    }
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const checkImgPokemon = getAllByTestId('pokemon-name');
    expect(checkImgPokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText } = renderWithRouter(<App />);
    const findButton = getByText('Dragon');
    fireEvent.click(findButton);

    expect(getByText(/Dragonair/)).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const findButtonReset = getByText('All');
    fireEvent.click(findButtonReset);

    expect(getByText(/Pikachu/)).toBeInTheDocument();
  });

  it('Teste se é criado, um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filters = 7;
    const checkAllButtons = getAllByTestId('pokemon-type-button');
    expect(checkAllButtons).toHaveLength(filters);
  });

  it('O botão de pokémon deve ser desabilitado quando tiver um só pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const checkBtn = getByText('Normal');
    fireEvent.click(checkBtn);
    expect(getByText(/Snorlax/i)).toBeInTheDocument();

    expect(getByText(/Próximo pokémon/i).closest('button')).toBeDisabled();
  });
});
