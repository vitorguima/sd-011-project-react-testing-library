import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(' Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getAllByTestId, getByAltText } = renderWithRouter(<App />);
    // Teste se é renderizado um card com as informações de determinado pokémon.
    const buttonElectric = getAllByTestId('pokemon-type-button')[0];
    expect(buttonElectric).toBeInTheDocument();
    expect(buttonElectric.innerHTML).toBe('Electric');
    fireEvent.click(buttonElectric);
    // O nome correto do Pokémon deve ser mostrado na tela;
    const pikachuName = getByTestId('pokemon-name');
    expect(pikachuName.innerHTML).toBe('Pikachu');
    // O tipo correto do pokémon deve ser mostrado na tela.
    const pikachuType = getByTestId('pokemon-type');
    expect(pikachuType.innerHTML).toBe('Electric');
    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight:
    const pikachuWeight = getByTestId('pokemon-weight');
    expect(pikachuWeight.innerHTML).toBe('Average weight: 6.0 kg');
    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL
    const pikachuImage = getByAltText('Pikachu sprite');
    expect(pikachuImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkDetails = getByText('More details');
      // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
      fireEvent.click(linkDetails);
      const pathPageDetailsPikachu = history.location.pathname;
      // teste também se a URL exibida no navegador muda para /pokemon/<id>
      expect(pathPageDetailsPikachu).toBe('/pokemons/25');
      const pikachuDetails = getByText('Pikachu Details');
      expect(pikachuDetails).toBeInTheDocument();
    });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const {
      getByText,
      getByAltText,
      getByLabelText,
      getByRole,
      history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkInputPokemonFavorite = getByRole('checkbox');
    expect(checkInputPokemonFavorite).toBeInTheDocument();
    const labelInputFavoritePokemon = getByLabelText('Pokémon favoritado?');
    expect(labelInputFavoritePokemon).toBeInTheDocument();
    fireEvent.click(checkInputPokemonFavorite);
    const buttonHome = getByText('Home');
    fireEvent.click(buttonHome);
    const starsPokemonFavorite = getByAltText('Pikachu is marked as favorite');
    //  imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido
    expect(starsPokemonFavorite).toBeInTheDocument('favorite');
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    expect(starsPokemonFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
