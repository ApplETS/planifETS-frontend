import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type BaseButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: FC<BaseButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-md transition-colors duration-200';

  const variantStyles = {
    primary: 'bg-buttonTags text-textLightBackground hover:bg-opacity-90',
    secondary: 'bg-gray-200 text-textDarkBackground hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
