import Atlas from '../components/Atlas/Atlas';
import { Header } from '../components/Header/Header';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Atlas />
      </div>
    </div>
  );
}
