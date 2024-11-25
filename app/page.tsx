import Atlas from '../components/Atlas/Atlas';
import { Header } from '../components/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Atlas />
      </main>
    </>
  );
}
