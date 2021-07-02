import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  it('testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Bug/i });
    fireEvent.click(button);
    const pokemon = getByText('Caterpie');
    const info = getByText('Average weight: 2.9 kg');
    const image = getByRole('img');
    const type = getByTestId('pokemon-type');
    expect(pokemon).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
    expect(image.alt).toContain('Caterpie sprite');
    expect(type.innerHTML).toBe('Bug');
  });

  it('testa se o card do Pokémon contém um link que exibe detalhes do pokémon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Bug/i });
    fireEvent.click(button);
    const detailsLink = getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const url = '/pokemons/10';
    expect(history.location.pathname).toBe(url);
  });

  it('testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Bug/i });
    fireEvent.click(button);

    const detailsLink = getByRole('link', { name: /More details/i });
    fireEvent.click(detailsLink);

    const favorites = getByRole('checkbox');
    fireEvent.click(favorites);

    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Caterpie is marked as favorite');
  });
});
