import Link from "next/link";

export function Header() {
  return (
    <header className="relative w-full py-4 flex justify-center items-center mb-4">
      <Link href="/">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-800">
          Atlas
        </h1>
      </Link>
    </header>
  );
}
