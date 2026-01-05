import Link from 'next/link';
import BaseButton from '@/components/atoms/buttons/BaseButton';
import Logo from '@/components/atoms/Logo';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-baseline justify-center p-16">
      <h1>
        <Logo textSize="py-2" />
      </h1>
      <h2 className="text-black py-2 text-left max-w-4xl">
        Planifiez votre cheminement universitaire en toute simplicité
      </h2>
      <h4 className="text-gray-600 py-2 text-left max-w-xl">
        Une app moderne pour orgainser vos cours à l'ÉTS,
        <br />
        tout en un seul endroit !
      </h4>
      <div className="flex flex-col sm:flex-row justify-baseline gap-4 py-2 sm:py-4 w-full">
        <Link href="/planner" className="w-full sm:w-auto">
          <BaseButton variant="primary" size="lg" className="w-full sm:w-auto">
            Démarrer maintenant
          </BaseButton>
        </Link>
        <a
          href="https://www.youtube.com/watch?v=E8gmARGvPlI&list=RDMME8gmARGvPlI"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <BaseButton variant="outlined" size="lg" className="w-full sm:w-auto">
            Rejoins notre communauté Discord
          </BaseButton>
        </a>
      </div>
    </main>
  );
}
