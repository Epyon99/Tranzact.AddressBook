import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { API } from './App'; './App';


beforeAll(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('API Calls and flow', () => {
  test('load contacts', async () => {
    const fakeUserResponse = [{ "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true }, { "contactId": "7f4939c4-a22f-471e-9c99-fb1f44fe5f61", "contactName": "a", "mobilePhone": "", "email": "", "address": "", "birthDay": "", "owner": "127.0.0.1", "isOwner": true, "isPublic": false }, { "contactId": "2879d94b-61f7-45bb-a6d9-7fdf2e8a73c4", "contactName": "asdfasfaa", "mobilePhone": "xzczxczx", "email": "fasdasdasd", "address": "12131211", "birthDay": "1231312", "owner": "127.0.0.1", "isOwner": true, "isPublic": true }];
    const promise = Promise.resolve(fakeUserResponse);
    var apiFunc = jest.spyOn(API, 'LoadContacts').mockImplementation(() => {
      return promise;
    });

    render(<App />);
    await act(async () => promise);
    const linkElement = screen.getByText(/qwertyQ/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('delete contact', async () => {
    const fakeUserResponse = [{ "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true }, { "contactId": "7f4939c4-a22f-471e-9c99-fb1f44fe5f61", "contactName": "a", "mobilePhone": "", "email": "", "address": "", "birthDay": "", "owner": "127.0.0.1", "isOwner": true, "isPublic": false }, { "contactId": "2879d94b-61f7-45bb-a6d9-7fdf2e8a73c4", "contactName": "asdfasfaa", "mobilePhone": "xzczxczx", "email": "fasdasdasd", "address": "12131211", "birthDay": "1231312", "owner": "127.0.0.1", "isOwner": true, "isPublic": true }];
    const promise = Promise.resolve(fakeUserResponse);
    var apiFunc = jest.spyOn(API, 'LoadContacts').mockImplementation(() => {
      return promise;
    });
    const delPromise = Promise.resolve(true);
    var delFunc = jest.spyOn(API, 'DeleteContact').mockImplementation(() => {
      return delPromise
    });
    render(<App />);
    await act(async () => promise);
    const inputel = screen.getByTestId("3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a_delete");
    fireEvent.click(inputel);
    await act(async () => delPromise);
    await act(async () => promise);
    expect(apiFunc).toHaveBeenCalled();
    expect(delFunc).toHaveBeenCalled();
  });
  test('edit contact', async () => {
    const fakeUserResponse = [{ "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true }, { "contactId": "7f4939c4-a22f-471e-9c99-fb1f44fe5f61", "contactName": "a", "mobilePhone": "", "email": "", "address": "", "birthDay": "", "owner": "127.0.0.1", "isOwner": true, "isPublic": false }, { "contactId": "2879d94b-61f7-45bb-a6d9-7fdf2e8a73c4", "contactName": "asdfasfaa", "mobilePhone": "xzczxczx", "email": "fasdasdasd", "address": "12131211", "birthDay": "1231312", "owner": "127.0.0.1", "isOwner": true, "isPublic": true }];
    const promise = Promise.resolve(fakeUserResponse);
    var apiFunc = jest.spyOn(API, 'LoadContacts').mockImplementation(() => {
      return promise;
    });
    const editResponse = { "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true };
    const uptPromise = Promise.resolve(editResponse);
    const savePromise = Promise.resolve(editResponse);
    var singleFunc = jest.spyOn(API, 'LoadSingleContact').mockImplementation(() => {
      return uptPromise;
    });
    var apiFunc = jest.spyOn(API, 'UpdateContact').mockImplementation(() => {
      return savePromise;
    });

    render(<App />);
    await act(async () => promise);
    const inputel = screen.getByTestId("3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a_update");
    expect(inputel).toBeInTheDocument();
    fireEvent.click(inputel);
    await act(async () => uptPromise);
    await act(async () => promise);
    const buton = screen.getByTestId("create-btn");
    expect(buton).toBeEnabled();
    fireEvent.click(buton);
    await act(async () => savePromise);
    expect(apiFunc).toHaveBeenCalled();
    expect(singleFunc).toHaveBeenCalled();

  });
  test('add contact', async () => {
    const fakeAddResponse = { "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true };
    const fakeUserResponse = [{ "contactId": "3d96b4c7-4313-4993-9eb1-d0bb8e9aa24a", "contactName": "qwertyQ", "mobilePhone": "qwerty", "email": "qwerty", "address": "qweqw12312313231", "birthDay": "qwwerqwrqw", "owner": "::1", "isOwner": false, "isPublic": true }, { "contactId": "7f4939c4-a22f-471e-9c99-fb1f44fe5f61", "contactName": "a", "mobilePhone": "", "email": "", "address": "", "birthDay": "", "owner": "127.0.0.1", "isOwner": true, "isPublic": false }, { "contactId": "2879d94b-61f7-45bb-a6d9-7fdf2e8a73c4", "contactName": "asdfasfaa", "mobilePhone": "xzczxczx", "email": "fasdasdasd", "address": "12131211", "birthDay": "1231312", "owner": "127.0.0.1", "isOwner": true, "isPublic": true }];
    const promise = Promise.resolve(fakeUserResponse);
    const addPromise = Promise.resolve(fakeAddResponse);
    var apiFunc = jest.spyOn(API, 'AddContact').mockImplementation(() => {
      return addPromise;
    });
    var loadFunc = jest.spyOn(API, 'LoadContacts').mockImplementation(() => {
      return promise;
    });
    render(<App />)
    const inputName = screen.getByTestId("name-input");
    fireEvent.change(inputName, { target: { value: 'moiseschirinos' } });
    const inputNumber = screen.getByTestId("mobilePhone-input");
    fireEvent.change(inputNumber, { target: { value: '999777888' } });
    const inputEmail = screen.getByTestId("email-input");
    fireEvent.change(inputEmail, { target: { value: 'moises@moises.com' } });
    const buton = screen.getByTestId("create-btn");
    expect(buton).toBeEnabled();
    fireEvent.click(buton);
    await act(async () => promise);
    expect(apiFunc).toHaveBeenCalled();
  });
});
