import React from 'react';
import { fireEvent, getByRole } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const pokeCard = container.querySelector('.pokemon-overview');
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    // ===

    const PokemonDetailTitle = getByText(`${pokeCard.firstChild.textContent} Details`);
    expect(PokemonDetailTitle).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const headers = container.querySelectorAll('h2');
    expect(headers[1]).toHaveTextContent('Summary');

    const sections = container.querySelectorAll('section');
    const paragraph = sections[1].lastChild.textContent;
    const pokeReturned = data.find((pokemon) => paragraph === pokemon.summary);
    expect(pokeCard.firstChild).toHaveTextContent(pokeReturned.name);
    console.log(pokeReturned);
  });

});
