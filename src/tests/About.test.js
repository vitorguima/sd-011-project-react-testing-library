import React from 'react';
import { renderWithRouter } from '../components';
import About from '../components/About';

describe('testing the \'About\' component', () => {
  it('tests if render informations about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const textAbout = getByText('About Pokédex');
    expect(textAbout).toBeInTheDocument();
  });

  it('tests if contain a heading <h2> \'About Pokédex \'', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('tests if the page has 2 paragraphs', () => {
    renderWithRouter(<About />);
    const elementP = document.querySelectorAll('p');
    expect(elementP).toHaveLength(2);
  });

  it('test if the elemnt <img> has a specific source', () => {
    renderWithRouter(<About />);
    const imgElement = document.getElementsByTagName('img');
    expect(imgElement[0].src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
