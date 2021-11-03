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
describe('UI Validation', () => {
  test('render application2', () => {
    render(<App />);
    const linkElement = screen.getByText(/Contact List/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('write name', () => {
    render(<App />);
    const inputel = screen.getByTestId("name-input");
    fireEvent.change(inputel, { target: { value: 'moises' } });
    expect(inputel).toHaveValue("moises");
    const msg = screen.queryByText('name is invalid');
    expect(msg).toBeNull();
  });
  test('name validation', () => {
    render(<App />);
    const inputel = screen.getByTestId("name-input");
    fireEvent.change(inputel, { target: { value: '1235' } });
    expect(inputel).toHaveValue("1235");
    const msg = screen.queryByText('contactName is invalid');
    expect(msg).toBeInTheDocument();
  });
  test('write email', () => {
    render(<App />);
    const inputel = screen.getByTestId("email-input");
    fireEvent.change(inputel, { target: { value: 'moises@moises.com' } });
    expect(inputel).toHaveValue("moises@moises.com");
    const msg = screen.queryByText('email is invalid');
    expect(msg).toBeNull();
  });
  test('email validation', () => {
    render(<App />);
    const inputel = screen.getByTestId("email-input");
    fireEvent.change(inputel, { target: { value: 'moises.com' } });
    expect(inputel).toHaveValue("moises.com");
    const msg = screen.queryByText('email is invalid');
    expect(msg).toBeInTheDocument();
  });

  test('write number', () => {
    render(<App />);
    const inputel = screen.getByTestId("mobilePhone-input");
    fireEvent.change(inputel, { target: { value: '936999999' } });
    expect(inputel).toHaveValue("936999999");
    const msg = screen.queryByText('email is invalid');
    expect(msg).toBeNull();
  });
  test('number validation', () => {
    render(<App />);
    const inputel = screen.getByTestId("mobilePhone-input");
    fireEvent.change(inputel, { target: { value: 'moises' } });
    expect(inputel).toHaveValue("moises");
    const msg = screen.queryByText('mobilePhone is invalid');
    expect(msg).toBeInTheDocument();

  });
});