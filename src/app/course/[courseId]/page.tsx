import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { courseService } from '@/api/services/course.service';
import { programService } from '@/api/services/program.service';
import CourseDetailsPage from '@/components/CourseDetails/CourseDetailsPage';
import { parsePositiveInteger } from '@/utils/numberUtil';

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ programId?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: CoursePageProps): Promise<Metadata> {
  const t = await getTranslations('CourseDetailsPage');
  const [{ courseId: rawCourseId }, { programId: rawProgramId }] = await Promise.all([
    params,
    searchParams,
  ]);

  const courseId = parsePositiveInteger(rawCourseId);
  const programId = parsePositiveInteger(rawProgramId);

  if (!courseId) {
    return { title: t('pageTitle') };
  }

  const getCourseTitle = async () => {
    // Prefer program-specific details when available
    if (programId) {
      const response = await courseService.getDetailedProgramCourse({ courseId, programId });
      const code = response.data.course.code;
      const title = response.data.course.title;

      if (code && title) {
        return `${code} - ${title}`;
      }
    }

    // Fallback to a more generic course lookup (does not require programId)
    const response = await programService.getCoursesByIds([courseId]);
    const course = response.data?.data
      ?.flatMap((program) => program.courses)
      .find((c) => c.id === courseId);

    if (course?.code && course?.title) {
      return `${course.code} - ${course.title}`;
    }

    return null;
  };

  try {
    const title = await getCourseTitle();
    if (title) {
      return { title };
    }
  } catch {
    // Fall back to the route title if metadata fetch fails.
  }

  return { title: t('pageTitle') };
}

export default function CoursePage() {
  return <CourseDetailsPage />;
}
