import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

type CourseSearchProps = {
  onSearch: (query: string) => void;
};

export default function CourseSearchbar({ onSearch }: CourseSearchProps) {
  const t = useTranslations('PlannerPage');

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Debounce search input to optimize performance
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  return (
    <div className="relative mt-4" data-testid="search-bar">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={t('search-course')}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border border-foreground w-full rounded-md bg-input text-foreground p-2 pl-10 focus:outline-hidden focus:ring-2 focus:ring-primary"
        data-testid="course-search-input"
      />
    </div>
  );
}
