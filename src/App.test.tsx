import App from './App.tsx';
import { render, screen } from '@testing-library/react';

test('render app with buttons', async () => {
  render(<App />);
  const buttonPnf = await screen.findByText('create pnf');
  expect(buttonPnf).not.toBeNull();
  const buttonComplex = await screen.findByText('create complex');
  expect(buttonComplex).not.toBeNull();
});
