import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';
// import renderWithRouter from '../renderWithRouter';

describe('Test if all the About page is being exhibited correctly', () => {
  test('checks for content in the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const content = getByText(/digital encyclopedia/i);
    expect(content).toBeInTheDocument();
  });

  test('checks for H2 content in the page', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const h2Content = getByRole('heading', { level: 2 });
    expect(h2Content).toHaveTextContent('About Pokédex');
  });

  test('checks for paragraphs', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph1 = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    const paragraph2 = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  test('checks for image to be displayed on screen', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageSrc = getByAltText('Pokédex');
    expect(imageSrc.src).toContain(imgUrl);
  });
});
