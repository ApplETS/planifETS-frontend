import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/shadcn/ui/input';

type CourseSearchProps = {
  onSearch: (query: string) => void;
  value?: string;
};

export default function CourseSearchbar({ onSearch, value = '' }: CourseSearchProps) {
  const t = useTranslations('PlannerPage');

  const [searchQuery, setSearchQuery] = useState(value);
  const prevValueRef = useRef(value);

  // Sync internal state with prop when it changes externally (not from user input)
  if (prevValueRef.current !== value) {
    prevValueRef.current = value;
    if (searchQuery !== value) {
      setSearchQuery(value);
    }
  }

  useEffect(() => {
    // Debounce search input to optimize performance
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  return (
    <div className="relative mt-4" data-testid="search-bar">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4.5" />
      <Input
        name="course-search"
        type="text"
        placeholder={t('search-course')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-10 rounded-xl bg-background pl-10 focus-visible:border-input focus-visible:ring-0 focus-visible:shadow-sm"
        data-testid="course-search-input"
      />
    </div>
  );
}
