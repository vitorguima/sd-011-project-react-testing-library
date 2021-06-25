import React from 'react';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('About test functions', () => {
  it('Verify if exist title `About Pokédex` ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/about');
    const titleAboutPokedex = getByText(/About Pokédex/);
    expect(titleAboutPokedex).toBeInTheDocument();
  });

  it('Verify if `/About` contains two paragraphs', () => {
    const { history, container } = renderWithRouter(<App />);

    history.push('/about');
    // https://stackoverflow.com/questions/54234515/get-by-html-element-with-react-testing-library - How select by HTML Element;
    const paragraphsLength = container.querySelectorAll('p');
    expect(paragraphsLength.length).toBe(2);
  });

  it('Verify if `/about` contains an image and image source is !== `` ', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    history.push('/about');
    const image = getByRole('img');
    const imageWithSource = image.src !== '';
    expect(imageWithSource).toBeTruthy();
  });
});
