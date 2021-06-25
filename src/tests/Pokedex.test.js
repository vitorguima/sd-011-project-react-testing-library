import React from 'react';
import { fireEvent } from '@testing-library/dom';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('testa a aplicação Pokedex', () => {
  it('verifica se a pagina contem um h2 com Encountered pokémons', () => {
    const { container, getByRole } = RenderWithRouter(<App />);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(getByRole('heading', { name: /Encountered pokémons/ })).toBeInTheDocument();
  });
  it('clicando no proximo pokemon se ele modifica', () => {
    const { getByText, getByTestId } = RenderWithRouter(<App />);
    const pokemonAnterior = getByTestId('pokemon-name').nodeValue;
    fireEvent.click(getByText(/Próximo pokémon/i));
    const novoPokemon = getByTestId('pokemon-name').nodeValue;
    expect(pokemonAnterior !== novoPokemon);
  });
  it('verifica se ele tras apenas um pokemon por vez', () => {
    const { container } = RenderWithRouter(<App />);
    expect(container.querySelectorAll('.pokemon')).toHaveLength(1);
  });
  it('Verifica se há botões para cada tipo de poke', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    const botoesDeFiltro = 7;
    expect(getAllByTestId('pokemon-type-button').length).toBe(botoesDeFiltro);
  });
  it('reseta o filtro', () => {
    const { getAllByText, getByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: /All/i }));
    expect(getAllByText(/Electric/i).length).toBe(2);
    fireEvent.click(getByRole('button', { name: /Próximo pokémon/ }));
    expect(getAllByText(/Fire/i).length).toBe(2);
  });
  it('desabilita o botao de proximo pokemon', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: /Electric/i }));
    fireEvent.click(getByRole('button', { name: /Próximo pokémon/ }));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
