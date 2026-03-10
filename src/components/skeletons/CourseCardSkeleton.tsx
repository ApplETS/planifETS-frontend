import type { FC } from 'react';

const CourseCardSkeleton: FC = () => {
  return (
    <div className="animate-pulse rounded-lg bg-muted p-4 mb-2">
      <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col space-y-2">
          {/* Course code skeleton */}
          <div className="h-5 w-24 rounded bg-background/50" />
        </div>
        <div className="mt-2 flex flex-wrap sm:mt-0 sm:flex-nowrap sm:items-center">
          {/* Status tag skeleton */}
          <div className="h-6 w-20 rounded-full bg-background/50" />
        </div>
      </div>
      {/* Credits text skeleton */}
      <div className="mt-2 h-4 w-16 rounded bg-background/50" />
    </div>
  );
};

export default CourseCardSkeleton;
