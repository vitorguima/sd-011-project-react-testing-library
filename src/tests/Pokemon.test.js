import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);

    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(name).not.toBeEmptyDOMElement();

    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(type).not.toBeEmptyDOMElement();

    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(weight).not.toBeEmptyDOMElement();

    const average = getByText(/Average weight/);
    expect(average).toBeInTheDocument();

    const img = getByRole('img', { name: /sprite/ });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', `${name.innerHTML} sprite`);
  });

  test('Teste o link de navegação do Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /More details/,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste o link de navegação do Pokémon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const btn = getByRole('link', { name: /More details/ });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btn = getByRole('link', {
      name: /More details/,
    });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    const name = getByTestId('pokemon-name');
    const fav = getByRole('checkbox', { name: /Pokémon favoritado?/ });
    userEvent.click(fav);

    const star = getByRole('img', {
      name: /Pikachu is marked as favorite/,
    });

    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${name.innerHTML} is marked as favorite`);
  });
});
