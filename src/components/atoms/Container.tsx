import type { FC, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  variant?: 'default' | 'session' | 'course';
  className?: string;
};

const Container: FC<ContainerProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-background',
    session: 'bg-[var(--color-sessions)]',
    course: 'bg-sessionCourse',
  };

  return (
    <div className={`rounded-lg p-4 shadow-xs ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
