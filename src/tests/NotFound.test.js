import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testing the NotFound Component', () => {
  // let getByAltText, getByRole;

  // beforeAll(() => {
  //   ({ getByAltText, getByRole } = renderWithRouter(<NotFound />));
  // });

  it('Testing the h2 element', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading');
    expect(notFound).toHaveTextContent('Page requested not found ');
  });

  it('Testing the img src element', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgElement = getByAltText(
      /Pikachu crying because the page requested was not found/i
    );
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(URL);
  });
});
