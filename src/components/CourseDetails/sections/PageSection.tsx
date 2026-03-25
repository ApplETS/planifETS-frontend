import type { ReactNode } from 'react';

type PageSectionProps = {
  title: string;
  children: ReactNode;
};

const PageSection = ({ title, children }: PageSectionProps) => (
  <section className="min-w-0 rounded-3xl border border-border/70 bg-background/95 p-4 shadow-sm backdrop-blur-sm">
    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    <div className="mt-2 min-w-0">{children}</div>
  </section>
);

export default PageSection;
