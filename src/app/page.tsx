import Link from 'next/link';
import BaseButton from '@/components/atoms/buttons/BaseButton';
import Logo from '@/components/atoms/Logo';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Logo textSize="text-6xl"></Logo>
      <h2 className="text-2xl text-gray-600 text-center max-w-xl">
        Planifiez votre cheminement universitaire en toute simplicité
      </h2>
      <h4 className="text-lg text-gray-600 text-center max-w-xl">
        Une app moderne pour orgainser vos cours à l'ÉTS,
        <br />
        tout en un seul endroit !
      </h4>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-8 w-full max-w-2xl">
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
