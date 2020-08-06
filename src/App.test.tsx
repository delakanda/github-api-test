import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import SearchInput from './components/search/SearchInput';
import { MockedProvider } from '@apollo/client/testing';
import { APOLLO_MOCKS } from './testingutils/ApolloUtils';

const setup = () => {
  return render(
    <MockedProvider mocks={APOLLO_MOCKS} addTypename={false}>
      <App />
    </MockedProvider>);
};

test('button is disabled when search input is empty', () => {
  const app = setup();
  const searchInput = app.getByTestId("search-input");
  const searchBtn = app.getByTestId("search-btn");

  fireEvent.change(searchInput, { target: { value: '' } });

  expect(searchBtn).toBeDisabled();
});

test('button is enabled when search input is not empty', () => {
  const app = setup();
  const searchInput = app.getByTestId("search-input");
  const searchBtn = app.getByTestId("search-btn");

  fireEvent.change(searchInput, { target: { value: 'dkanda' } });

  expect(searchBtn).not.toBeDisabled();
});

test('search for user yields card result', async () => {
  const app = setup();

  const searchInput = app.getByTestId("search-input");
  const searchBtn = app.getByTestId("search-btn");

  act(() => {
    fireEvent.change(searchInput, { target: { value: 'dkanda' } });
    fireEvent.click(searchBtn);
  });

  await new Promise(resolve => setTimeout(resolve))

  const userCards = app.queryAllByTestId("user-card"); 
  expect(userCards).toHaveLength(1);
});