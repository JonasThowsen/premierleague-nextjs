import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white-800 text-purple">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mr-2"
          />
        </Link>
        <h1 className="text-lg font-semibold">Football Stats</h1>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/standings">Standings</Link>
        </li>
        <li>
          <Link href="/fixtures">Fixtures</Link>
        </li>
        <li>
          <Link href="/teams">Teams</Link>
        </li>
      </ul>
    </nav>
  );
}
