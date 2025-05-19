import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@/utils/axiosclient', () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
      post: jest.fn(),
    },
  };
});

import axiosClient from './utils/axiosclient';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('app Component', () => {
  it('Should renders app component', async () => {
    (axiosClient.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Mock Product',
          price: 50,
          category: 'fashion',
          image: 'mock-image.jpg',
          description: 'A mock product',
        },
      ],
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // Confirm the app loaded expected content
    expect(await screen.findByText(/ecomm/i)).toBeInTheDocument();
  });
});
