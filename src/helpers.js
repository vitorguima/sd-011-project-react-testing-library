import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export function renderWithRouter(component) {
  const history = createMemoryHistory();

  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

// The function below was written based on this example: https://stackoverflow.com/a/49139380
export function waitFor(queryFunction) {
  const attemptsInterval = 1000;
  const maxAttempts = 3;
  let attempts = 0;
  let response;
  let error;

  return new Promise((resolve, reject) => {
    const intervalID = setInterval(() => {
      try {
        response = queryFunction();
      } catch (caughtError) {
        error = caughtError;
      } finally {
        attempts += 1;

        if (response) {
          clearInterval(intervalID);
          resolve(response);
        } else if (attempts === maxAttempts) {
          clearInterval(intervalID);
          reject(error);
        }
      }
    }, attemptsInterval);
  });
}