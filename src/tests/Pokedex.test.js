import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente Pokedex - R5', () => {
  it('Verifica se o componente possui o título correto', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });
  it('Verifica as funcionalidades do bt próximo pokemon', () => {
    const { getByRole, queryByText } = renderWithRouter(<App />);
    const nextBtn = getByRole('button', { name: /Próximo pokémon/ });
    expect(nextBtn).toBeInTheDocument();
    fireEvent.click(nextBtn);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
    const nclicks = 8;
    for (let index = 0; index < nclicks; index += 1) {
      fireEvent.click(nextBtn);
    }
    expect(queryByText('Pikachu')).toBeInTheDocument();
  });
  it('Verifica se apenas um poke é renderizado', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const nPokes = getAllByText(/kg/i);
    expect(nPokes.length).toBe(1);
  });
  it('Verifica o filtro Fire', () => {
    const { getAllByText, getByRole, queryByText } = renderWithRouter(<App />);
    const FireBtn = getByRole('button', { name: /Fire/i });
    fireEvent.click(FireBtn);
    const fireTexts = getAllByText(/Fire/i);
    expect(fireTexts.length).toBe(2);
    const nextBtn = getByRole('button', { name: /Próximo pokémon/ });
    fireEvent.click(nextBtn);
    expect(queryByText('Charmander')).not.toBeInTheDocument();
    const fireTexts2 = getAllByText(/Fire/i);
    expect(fireTexts2.length).toBe(2);
  });
  it('Verifica o filtro All', () => {
    const { getAllByText, getByRole } = renderWithRouter(<App />);
    const AllBtn = getByRole('button', { name: /All/i });
    fireEvent.click(AllBtn);
    const electricTexts = getAllByText(/Electric/i);
    expect(electricTexts.length).toBe(2);
    const nextBtn = getByRole('button', { name: /Próximo pokémon/ });
    fireEvent.click(nextBtn);
    const fireTexts = getAllByText(/Fire/i);
    expect(fireTexts.length).toBe(2);
  });
  it('Verifica se há botões para cada tipo de poke', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeBtns = getAllByTestId('pokemon-type-button');
    const nTypes = 7;
    expect(typeBtns.length).toBe(nTypes);
  });
  it('Verifica se o botão próximo desabilita', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const ElectricBtn = getByRole('button', { name: /Electric/i });
    fireEvent.click(ElectricBtn);
    const nextBtn = getByRole('button', { name: /Próximo pokémon/ });
    fireEvent.click(nextBtn);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
