// ideia tirada do codigo https://github.com/tryber/sd-011-project-react-testing-library/pull/76/files da Gisele Costa

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const {
  type,
  name,
  image,
  averageWeight: { value, measurementUnit },
  id,
} = pokemons[0];

describe('Teste o componente <Pokemon.js />', () => {
  test(
    'Teste se é renderizado um card com as informações de determinado '
      + 'pokémon.',
    () => {
      const { getByTestId, getByRole } = renderWithRouter(<App />);
      fireEvent.click(getByRole('button', { name: type }));
      expect(getByTestId('pokemon-name').textContent).toBe(name);
      expect(getByTestId('pokemon-type').textContent).toBe(type);
      expect(getByTestId('pokemon-weight').textContent).toBe(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(getByRole('img').src).toBe(image);
      expect(getByRole('img').alt).toBe(`${name} sprite`);
    },
  );
  test(
    'Teste se o card do Pokémon indicado na Pokédex contém um link de '
      + 'navegação para exibir detalhes deste Pokémon. O link deve possuir a'
      + 'URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const match = getByText(`${name} Details`);
      expect(match).toBeInTheDocument();
    },
  );
  test(
    'Teste se ao clicar no link de navegação do Pokémon, é feito o '
      + 'redirecionamento da aplicação para a página de detalhes de Pokémon.',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText('More details'));
      expect(history.location.pathname).toBe(`/pokemons/${id}`);
    },
  );
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    const starImg = getByAltText(`${name} is marked as favorite`);
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toContain('/star-icon.svg');
  });
});
