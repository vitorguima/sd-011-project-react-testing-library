import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
  it('A página deve conter um texto "<name> Details".', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);

    userEvent.click(detailsLink);

    const pageTitle = getByText(/Pikachu Details/i);
    expect(pageTitle.textContent).toBe('Pikachu Details');
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const detailsLink = getAllByRole('link')[3];
    userEvent.click(detailsLink);

    expect(getAllByRole('link')[3]).toBeUndefined();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const summary = getAllByRole('heading')[2];

    expect(summary.textContent).toBe('Summary');
    expect(summary.localName).toBe('h2');
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const paragraph = getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );

    expect(paragraph.textContent).toBe(
      'This intelligent Pokémon roasts hard'
      + ' berries with electricity to make them tender enough to eat.',
    );
  });
});
