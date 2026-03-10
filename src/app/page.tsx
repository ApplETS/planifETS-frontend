import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Button } from '@/shadcn/ui/button';

export default async function HomePage() {
  const t = await getTranslations('Landing');

  return (
    <>
      <section className="relative isolate overflow-hidden bg-background text-foreground">
        <div
          className="pointer-events-none fixed inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <svg
            className="relative left-[calc(50%-16rem)] h-[24rem] max-w-none -translate-x-1/2 rotate-[22deg] opacity-95 sm:left-[calc(50%-34rem)] sm:h-[46rem] lg:left-[calc(50%-42rem)] xl:left-[calc(50%-48rem)] dark:hidden"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#landingBlobGradientLight)"
              fillOpacity="0.36"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient id="landingBlobGradientLight" x1="1155.49" x2="-78.208" y1=".177" y2="474.645">
                <stop offset="0%" stopColor="#fee2e2" />
                <stop offset="48%" stopColor="#fed7e2" />
                <stop offset="100%" stopColor="#fca5a5" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="absolute left-[calc(50%-8rem)] top-20 h-[12rem] max-w-none -translate-x-1/2 rotate-[12deg] opacity-100 sm:left-[calc(50%-20rem)] sm:top-28 sm:h-[18rem] lg:left-[calc(50%-25rem)] dark:hidden"
            viewBox="0 0 780 520"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#landingBlobAccentLight)"
              fillOpacity="0.55"
              d="M203.76 74.838c57.296-35.094 143.979-52.31 206.571-21.975 62.276 30.182 100.09 107.997 150.826 157.881 47.711 46.91 117.976 75.783 140.903 137.881 24.306 65.833-2.585 146.898-55.167 193.579-50.397 44.742-123.059 55.942-189.952 48.977-62.543-6.514-116.589-41.217-176.922-58.64-70.145-20.257-157.607-15.489-210.06-66.336C18.722 418.569-5.168 337.214.966 264.903c5.982-70.524 34.07-142.354 89.709-186.356 31.264-24.726 75.792-17.77 113.085-3.709z"
            />
            <defs>
              <radialGradient id="landingBlobAccentLight" cx="0" cy="0" r="1" gradientTransform="translate(392 260) rotate(25) scale(330 230)" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="55%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
          <svg
            className="hidden dark:block relative left-[calc(50%-18rem)] h-[26rem] max-w-none -translate-x-1/2 rotate-[18deg] opacity-95 sm:left-[calc(50%-35rem)] sm:h-[48rem] lg:left-[calc(50%-44rem)] xl:left-[calc(50%-50rem)]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="landing-blob-path"
              fill="url(#landingBlobGradientDark)"
              fillOpacity="0.42"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient id="landingBlobGradientDark" x1="1155.49" x2="-78.208" y1=".177" y2="474.645">
                <stop offset="0%" stopColor="#312e81" />
                <stop offset="50%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="hidden dark:block absolute left-[calc(50%-9rem)] top-24 h-[12rem] max-w-none -translate-x-1/2 rotate-[10deg] opacity-100 sm:left-[calc(50%-22rem)] sm:h-[19rem] lg:left-[calc(50%-27rem)]"
            viewBox="0 0 780 520"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="landing-blob-path-secondary"
              fill="url(#landingBlobAccentDark)"
              fillOpacity="0.48"
              d="M203.76 74.838c57.296-35.094 143.979-52.31 206.571-21.975 62.276 30.182 100.09 107.997 150.826 157.881 47.711 46.91 117.976 75.783 140.903 137.881 24.306 65.833-2.585 146.898-55.167 193.579-50.397 44.742-123.059 55.942-189.952 48.977-62.543-6.514-116.589-41.217-176.922-58.64-70.145-20.257-157.607-15.489-210.06-66.336C18.722 418.569-5.168 337.214.966 264.903c5.982-70.524 34.07-142.354 89.709-186.356 31.264-24.726 75.792-17.77 113.085-3.709z"
            />
            <defs>
              <radialGradient id="landingBlobAccentDark" cx="0" cy="0" r="1" gradientTransform="translate(392 260) rotate(25) scale(330 230)" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="52%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1659eb" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

        </div>

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-start px-6 pb-12 pt-40 md:px-10 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-slate-100"
              data-testid="landing-headline"
            >
              {t('headline')}
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
              data-testid="landing-subheadline"
            >
              {t('subheadline')}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" data-testid="landing-cta-primary">
                <Link href="/planner">{t('ctaPrimary')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/planner">{t('ctaSecondary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>

  );
}
