import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Tentando se é mostrado as informações do pokemon', () => {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
  const btn = getByRole('button', { name: /Fire/i });
  userEvent.click(btn);
  const pokemon = getByText(/Charmander/i);
  const infoPoke = getByText('Average weight: 8.5 kg');
  const imagem = getByRole('img');
  const type = getByTestId('pokemon-type');

  expect(pokemon).toBeInTheDocument();
  expect(infoPoke).toBeInTheDocument();
  expect(imagem.src).toContain('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  expect(imagem.alt).toContain('Charmander sprite');
  expect(type.innerHTML).toBe('Fire');
});

test('Testa o link de navegação do pokemon', () => {
  // const linkHistory = history.location.pathname; Deu ruim
  const { getByRole, history } = renderWithRouter(<App />);
  const btn = getByRole('button', { name: /Fire/i });
  userEvent.click(btn);
  const link = getByRole('link', { name: /More details/i });
  expect(link).toBeInTheDocument();
  userEvent.click(link);
  const linkUrl = '/pokemons/4';
  expect(history.location.pathname).toBe(linkUrl);
});

test('Testa se existe um pokemons com estrela', () => {
  const { getByRole, getAllByRole } = renderWithRouter(<App />);
  const button = getByRole('button', { name: /Fire/i });
  userEvent.click(button);

  const link = getByRole('link', { name: /More details/i });
  userEvent.click(link);

  const favoritesPokes = getByRole('checkbox');
  userEvent.click(favoritesPokes);

  const image = getAllByRole('img');
  expect(image[1].src).toContain('star-icon.svg');
  expect(image[1].alt).toContain('Charmander is marked as favorite');
});
