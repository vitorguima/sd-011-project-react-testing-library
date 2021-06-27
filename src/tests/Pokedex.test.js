import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const getTag = getByText('Encountered pokémons');
    expect(getTag).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const getTag = getByText('All');
    expect(getTag).toBeInTheDocument();
    fireEvent.click(getTag);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Caterpie')).toBeInTheDocument();
  });
  it('Teste se é criado, dinamicamente, um botão de filtro para cada tipo.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const tests = getAllByTestId('pokemon-type-button');
    expect(tests[0].textContent).toBe('Electric');
    expect(tests[1].textContent).toBe('Fire');
    expect(tests[2].textContent).toBe('Bug');
    expect(tests[3].textContent).toBe('Poison');
    expect(tests[4].textContent).toBe('Psychic');
    expect(tests[5].textContent).toBe('Normal');
    expect(tests[6].textContent).toBe('Dragon');
  });
});
