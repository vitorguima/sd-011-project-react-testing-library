import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Testa se não tem nenhum pokemon como favorito', () => {
  const { getByText } = render(<FavoritePokemons />);
  const textFound = getByText(/No favorite pokemon found/);
  expect(textFound).toBeInTheDocument();
});

test('Testa se existem pokemons favoritados', () => {
  const { history, getAllByText, getByRole } = renderWithRouter(<App />);

  history.push('/pokemons/4'); // Coloca o Pokemon no histórico de navegação (Charmander)
  const check = getByRole('checkbox'); // Simula um clique
  userEvent.click(check); // Simula se ao clicar em clique o check é marcado
  history.push('/pokemons/65'); // Coloca outro Pokemon no histórico de navegação (Alakazam)
  userEvent.click(check);

  history.push('/favorites'); // puxa o /favorites
  const numberPokemnos = getAllByText(/More details/i); // verifica se tem dois textos iguais
  expect(numberPokemnos.length).toEqual(2); // havendo, passa o teste
});
