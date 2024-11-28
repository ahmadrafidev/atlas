import Link from "next/link";

export function Header() {
  return (
    <header className="relative w-full px-12 py-4 flex justify-start items-center">
      <Link href="/">
        <h1 className="text-5xl font-semibold tracking-tight">
          Atlas
        </h1>
      </Link>
    </header>
  );
}
