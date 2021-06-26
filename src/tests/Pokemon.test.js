import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRoute';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Requisito 06', () => {

  describe('renderizado um card com as informações de determinado pokémon.', () => {
    it('teste se é renderizado as informações no card Pokemon', () => {
      const pikachu = pokemons[0];
      const { name, type } = pikachu;
      const { value, measurementUnit } = pikachu.averageWeight;
      const { getByText, getByTestId, container } = renderWithRouter(
        <Pokemon pokemon={ pikachu } isFavorite={ false } />,
      );
      expect(getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(getByTestId('pokemon-type')).toHaveTextContent(type);
      expect(getByText(`Average weight: ${value} ${measurementUnit}`))
        .toBeInTheDocument();
      const image = container.querySelector('img');
      expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(image.alt).toBe('Pikachu sprite');
    });

    it('Teste se contém um link de navegação para exibir detalhes', () => {
      const pikachu = pokemons[0];
      const { getByText, history } = renderWithRouter(<App />);
      const homePath = getByText(/Home/i);
      fireEvent.click(homePath);
      const details = getByText(/More details/i);
      fireEvent.click(details);
      const historyPath = history.location.pathname;
      expect(historyPath).toBe(`/pokemons/${pikachu.id}`);
    });

    it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
      const { getByText, container } = renderWithRouter(<App />);
      const details = getByText(/More details/i);
      fireEvent.click(details);
      const favorite = container.querySelector('#favorite');
      fireEvent.click(favorite);
      const icon = container.querySelector('.favorite-icon');
      expect(icon).toBeInTheDocument();
      expect(icon.src).toContain('/star-icon.svg');
      expect(icon.alt).toBe('Pikachu is marked as favorite');
    });
  });
});
