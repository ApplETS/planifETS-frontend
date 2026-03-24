import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import CourseDetailsPage from '@/components/CourseDetails/CourseDetailsPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('CourseDetailsPage');

  return { title: t('pageTitle') };
}

export default function CourseSearchPage() {
  return <CourseDetailsPage />;
}
