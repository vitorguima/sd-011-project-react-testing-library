import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';

const [Pikachu] = pokemons;
const detailsLink = 'More details';
describe('Testes relativos ao componente "Pokemon"', () => {
  it(
    'Verifica se é renderizado um card com as informações corretas de um pokémon',
    () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const name = getByTestId('pokemon-name');
      const type = getByTestId('pokemon-type');
      const weight = getByTestId('pokemon-weight');
      const imagePokemon = document.querySelector('img');
      const details = getByText(detailsLink);
      const next = getByText('Próximo pokémon');

      pokemons.forEach((pokemon) => {
        const { averageWeight: { value, measurementUnit } } = pokemon;
        expect(name.innerHTML).toBe(pokemon.name);
        expect(type.innerHTML).toBe(pokemon.type);
        expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
        expect(imagePokemon.src).toBe(pokemon.image);
        expect(imagePokemon.alt).toBe(`${pokemon.name} sprite`);
        expect(details.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
        fireEvent.click(next);
      });
    },
  );

  it('Testa se, ao clicar em "More Details", a aplicação redireciona certo', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const details = getByText(detailsLink);

    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${Pikachu.id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokemóns favoritados', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const details = getByText(detailsLink);
    const home = getByText('Home');

    fireEvent.click(details);
    const favoritado = document.querySelector('#favorite');
    expect(favoritado).toBeInTheDocument();
    fireEvent.click(favoritado);
    fireEvent.click(home);
    const favoriteStar = document.querySelector('.favorite-icon');
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteStar.alt).toBe('Pikachu is marked as favorite');
  });
});
