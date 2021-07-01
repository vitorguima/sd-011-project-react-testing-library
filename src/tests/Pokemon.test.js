import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity.',
};

describe('Teste do componente "Pokemon.js"', () => {
  test('Teste se é renderizado um card com as informações'
  + 'de determinado pokémon.', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
      showDetailsLink
    />);

    const getNamePokemon = getByText(/Pikachu/i);
    expect(getNamePokemon).toBeInTheDocument();

    const getTypePokemon = getByTestId('pokemon-type');
    expect(getTypePokemon.innerHTML).toEqual('Electric');

    const { averageWeight: { value, measurementUnit } } = pokemon;
    const getWeightPoke = getByTestId('pokemon-weight');
    expect(getWeightPoke.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    const getImg = getByRole('img');
    expect(getImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const { name } = pokemon;
    expect(getImg.alt).toBe(`${name} sprite`);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
  + ' para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
  + ' onde <id> é o id do Pokémon exibido;', () => {
    const { getByText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
      showDetailsLink
    />);

    const getMoreDetails = getByText(/More details/i);
    const { id } = pokemon;
    expect(getMoreDetails.href).toContain(`pokemons/${id}`);
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + ' da aplicação para a página de detalhes de Pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);

    const getMoreDetails = getByText(/More details/i);
    userEvent.click(getMoreDetails);
    const getDetails = getByText(/Pikachu details/i);
    expect(getDetails).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
  + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver;', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const getMoreDetails = getByText(/More details/i);
    userEvent.click(getMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
      showDetailsLink
    />);

    const getImg = getAllByRole('img');
    expect(getImg[1].src).toContain('/star-icon.svg');
    const { name } = pokemon;
    expect(getImg[1].alt).toBe(`${name} is marked as favorite`);
  });
});
