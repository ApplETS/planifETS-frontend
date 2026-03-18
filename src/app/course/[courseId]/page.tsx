import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CourseDetailsPage from '@/components/CourseDetails/CourseDetailsPage';
import { parsePositiveInteger } from '@/utils/numberUtil';

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const t = await getTranslations('CourseDetailsPage');
  const { courseId: rawCourseId } = await params;

  const courseId = parsePositiveInteger(rawCourseId);

  if (!courseId) {
    return { title: t('pageTitle') };
  }

  return { title: t('pageTitle') };
}

export default function CoursePage() {
  return <CourseDetailsPage />;
}
