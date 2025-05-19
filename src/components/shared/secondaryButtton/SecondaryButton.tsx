import React from 'react';
import styles from './SecondaryButton.module.css';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button className={styles.secondary} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default SecondaryButton;
