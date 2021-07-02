import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole, getByText } = renderWithRouter(<App />);

    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemon-type')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();

    const btn = getByRole('button', { name: /Fire/i });
    fireEvent.click(btn);
    const image = getByRole('img');
    const type = getByTestId('pokemon-type');

    expect(getByText('Charmander'));
    expect(getByText('Average weight: 8.5 kg'));
    expect(image).toContainHTML('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(image).toContainHTML('Charmander sprite');
    expect(type).toContainHTML('Fire');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByRole, history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Bug/i));
    fireEvent.click(getByRole('link', { name: /More details/i }));
    const URL = '/pokemons/10';
    expect(history.location.pathname).toBe(URL);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole, history, getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Psychic/i));
    fireEvent.click(getByRole('link', { name: /More details/i }));
    const URL = '/pokemons/65';
    fireEvent.click(getByRole('checkbox'));

    const image = container.querySelector('.favorite-icon');
    expect(image).toContainHTML('star-icon.svg');
    expect(image).toContainHTML('Alakazam is marked as favorite');
    expect(history.location.pathname).toBe(URL);

    fireEvent.click(getByRole('checkbox'));
  });
});
