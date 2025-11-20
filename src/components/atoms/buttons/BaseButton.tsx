import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type BaseButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// @deprecated: Use shadcn button instead
const BaseButton: FC<BaseButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  startIcon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md transition-colors duration-200';

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',

    secondary: 'bg-background text-foreground hover:bg-background/90',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outlined: 'border border-primary text-primary hover:bg-primary/10',
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
      {startIcon && (
        <span className="inline-flex items-center justify-center mr-2">{startIcon}</span>
      )}
      {children}
    </button>
  );
};

export default BaseButton;
