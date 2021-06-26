import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Verifica requisito 6', () => {
  it('Teste Renderiza Card  `/`', () => {
    renderWithRouter(<App />);

    const cardPokemon = screen.getByTestId('pokemon-name');
    expect(cardPokemon).toHaveTextContent('Pikachu');
    expect(cardPokemon).toBeInTheDocument();
    const tipoPokemon = screen.getByTestId('pokemon-type');
    expect(tipoPokemon).toHaveTextContent('Electric');
    expect(tipoPokemon).toBeInTheDocument();
    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(pesoPokemon).toBeInTheDocument();
    const imgPokemon = screen.getByAltText('Pikachu sprite');
    const urlImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imgPokemon).toHaveAttribute('src', urlImg);
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });
});

it('Teste Link Mais Detalhes ', () => {
  const { history, container } = renderWithRouter(<App />);

  const link = screen.getByText('More details');
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  const CheckBox = screen.getByRole('checkbox');
  expect(CheckBox).toBeInTheDocument();
  fireEvent.click(CheckBox);
  const redireciona = screen.getByText('Home');
  fireEvent.click(redireciona);
  const favoritoPokemon = container.querySelector('.favorite-icon');
  expect(favoritoPokemon).toBeInTheDocument();
  const imageStar = '/star-icon.svg';
  expect(favoritoPokemon).toHaveAttribute('src', imageStar);
  expect(favoritoPokemon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
