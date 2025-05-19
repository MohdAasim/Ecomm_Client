import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the button with children text', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the disabled attribute when disabled is true', () => {
    render(<PrimaryButton disabled>Click Me</PrimaryButton>);
    const buttonElement = screen.getByText('Click Me') as HTMLButtonElement;
    expect(buttonElement).toBeDisabled();
  });
});
