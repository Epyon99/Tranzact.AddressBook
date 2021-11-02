import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { API } from './App'; './App';

test('render application', () => {
  render(<App />);
  const linkElement = screen.getByText(/Contact List/i);
  expect(linkElement).toBeInTheDocument();
});

test('write name', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('name validation', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('write birthdate', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('birthdate validation', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('number validation', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('load contacts', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('add contact', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('edit contact', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});
test('delete contact', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});

test('write name and validation', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});

test('write name and validation', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});

test('write name and validation', () => {
  render(<App />);
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises' } });
  expect(inputel).toHaveValue("moises");
});


test('load contacts method', async () => {
  const fakeUserResponse = [{ "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true }, { "contactId": "7f4939c4-a22f-471e-9c99-fb1f44fe5f61", "contactName": "a", "mobilePhone": "", "email": "", "address": "", "birthDay": "", "owner": "127.0.0.1", "isOwner": true, "isPublic": false }, { "contactId": "2879d94b-61f7-45bb-a6d9-7fdf2e8a73c4", "contactName": "asdfasfaa", "mobilePhone": "xzczxczx", "email": "fasdasdasd", "address": "12131211", "birthDay": "1231312", "owner": "127.0.0.1", "isOwner": true, "isPublic": true }];
  const promise = Promise.resolve(fakeUserResponse);
  var apiFunc = jest.spyOn(API, 'LoadContacts').mockImplementationOnce(() => {
    return promise
  });

  render(<App />);
  await act (async () => promise);
  const linkElement = screen.getByText(/qwertyQ/i);
  expect(linkElement).toBeInTheDocument();
});

test ('create contact method', async () => {
  
  const fakeUserResponse = [{ "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true }, { "contactId": "7f4939c4-a22f-471e-9c99-fb1f44fe5f61", "contactName": "a", "mobilePhone": "", "email": "", "address": "", "birthDay": "", "owner": "127.0.0.1", "isOwner": true, "isPublic": false }, { "contactId": "2879d94b-61f7-45bb-a6d9-7fdf2e8a73c4", "contactName": "asdfasfaa", "mobilePhone": "xzczxczx", "email": "fasdasdasd", "address": "12131211", "birthDay": "1231312", "owner": "127.0.0.1", "isOwner": true, "isPublic": true }];
  const promise = Promise.resolve(fakeUserResponse);
  const addPromise = Promise.resolve();
  var apiFunc = jest.spyOn(API, 'AddContact').mockImplementationOnce(() => {
    return addPromise
  });
  var loadFunc = jest.spyOn(API, 'LoadContacts').mockImplementationOnce(() => {
    return promise
  });
  render(<App />)
  const inputel = screen.getByTestId("name-input");
  fireEvent.change(inputel, { target: { value: 'moises-val' } });
  expect(inputel).toHaveValue("moises-val");
  const buton = screen.getByTestId("create-btn");
  fireEvent.click(buton);
  await act (async () => promise);
  expect(apiFunc).toHaveBeenCalled();
  
});