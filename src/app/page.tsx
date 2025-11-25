import { Hero } from '@/components/landing/Hero';
import { Templates } from '@/components/landing/Templates';
import { Pricing } from '@/components/landing/Pricing';

export default function Home() {
  return (
    <main className="min-h-screen pt-0">
      <Hero />
      <Templates />
      <Pricing />
    </main>
  );
}
