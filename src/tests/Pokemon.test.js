import { fireEvent } from '@testing-library/react';
import React from 'react';
// import App from '../App';
import Pokemon from '../components/Pokemon';
import data from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const { name, type, averageWeight: { value, measurementUnit }, image, id } = data[0];

describe('Testa o componente <App.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, container } = renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite={ false } showDetailsLink={ false } />,
    );
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    const pokemonImagem = container.querySelectorAll('img')[0];
    expect(pokemonImagem.src).toBe(image);
    expect(pokemonImagem.alt).toBe(`${name} sprite`);
  });

  it('Testa se o card na Pokédex contém um link para exibir detalhes do Pokémon.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/More details/)).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite showDetailsLink={ false } />,
    );
    const favoriteImage = container.querySelectorAll('img')[1];
    expect(favoriteImage.src).toContain('star-icon.svg');
    expect(favoriteImage.alt).toContain(`${name} is marked as favorite`);
  });
});
