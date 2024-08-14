import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./Toggle";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <header className="fixed left-0 top-0 z-[20] w-full shadow-sm backdrop-blur">
      <nav className="m-auto flex max-w-[1400px] items-center justify-between px-1 py-5 sm:px-3">
        <Link
          href="/"
          className="flex items-center gap-3 overflow-hidden rounded-sm"
        >
          <Image src={logo} width={120} height={50} alt="logo" />
          <span className="sr-only">Jobify</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          <ModeToggle />
          <Button asChild variant="outline">
            <Link href="/admin">Admin</Link>
          </Button>
          <Button asChild>
            <Link href="/jobs/new">New Job</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
