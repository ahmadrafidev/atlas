import Link from "next/link";

export function Header() {
  return (
    <header className="relative w-full px-4 py-2 pt-4 flex justify-center items-center">
      <Link href="/">
        <h1 className="text-5xl font-semibold tracking-tight">
          Atlas
        </h1>
      </Link>
    </header>
  );
}
