import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type BaseButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: FC<BaseButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  startIcon,
  className = '',
  ...props
}) => {
  const baseStyles
    = 'inline-flex items-center justify-center rounded-md transition-colors duration-200';

  const variantStyles = {
    primary:
      'bg-[var(--color-buttonTags)] text-[var(--color-textLightBackground)] hover:bg-[var(--color-buttonTags)/90]',
    secondary:
      'bg-[var(--color-yearSection)] text-[var(--color-textDarkBackground)] hover:bg-[var(--color-yearSection)/90]',
    danger:
      'bg-[var(--color-failedCourseTag)] text-[var(--color-textLightBackground)] hover:bg-[var(--color-failedCourseTag)/90]',
    outlined:
      'border border-[var(--color-buttonTags)] text-[var(--color-buttonTags)] hover:bg-[var(--color-buttonTags)/10]',
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
