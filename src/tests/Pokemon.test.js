import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Testes do componente Pokemon', () => {
  const path = '/pokemons/25';

  describe('Teste se é renderizado um card com as informações do pokémon.', () => {
    it('O nome correto do Pokémon deve ser mostrado na tela', () => {
      const { getByTestId } = renderWithRouter(<App />);

      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe('Pikachu');
    });

    it('O tipo correto do pokémon deve ser mostrado na tela', () => {
      const { getByTestId } = renderWithRouter(<App />);

      const pokemonType = getByTestId('pokemon-type');
      expect(pokemonType.textContent).toBe('Electric');
    });

    it('O peso do pokémon deve ser exibido.', () => {
      const { getByTestId } = renderWithRouter(<App />);

      const pokemonWeight = getByTestId('pokemon-weight');
      expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    });

    it('A imagem do Pokémon deve ser exibida.', () => {
      const { getByRole } = renderWithRouter(<App />);

      const pokemonImg = getByRole('img');
      expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonImg.alt).toBe('Pikachu sprite');
    });
  });

  it('Testa se o card indicado na Pokédex contém um link para exibir detalhes.', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/More details/i);

    expect(link).toBeInTheDocument();
    expect(link.pathname).toBe(path);
  });

  it('Testa se ao clicar no link, é feito o redirecionamento para detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/More details/i);
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe(path);
  });

  it('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/More details/i);

    expect(history.location.pathname).toBe('/');
    userEvent.click(link);
    expect(history.location.pathname).toBe(path);
  });

  describe('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    it('O ícone deve ser uma imagem contendo o caminho /star-icon.svg', () => {
      const {
        getAllByRole,
        getByText,
        getByLabelText,
        history,
      } = renderWithRouter(<App />);

      const detailsLink = getByText(/More details/i);

      userEvent.click(detailsLink);

      const favoriteButton = getByLabelText(/Pokémon favoritado?/i);
      userEvent.click(favoriteButton);
      history.push('/');

      const image = getAllByRole('img')[1];
      expect(image).toHaveAttribute('src', '/star-icon.svg');
    });

    it('A imagem deve ter o alt igual a <pokemon> is marked as favorite', () => {
      const { getAllByRole } = renderWithRouter(<App />);

      const image = getAllByRole('img')[1];
      expect(image.alt).toBe('Pikachu is marked as favorite');
    });
  });
});
