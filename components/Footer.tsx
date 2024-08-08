import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="container mt-10 text-slate-950 min-h-20 relative p-5 pb-0">
      <div className="">
        <div>
          <h1>Useful Links</h1>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">&copy; 2024 21stCampus </p>
        <Image
          alt="21stCampus logo"
          src={"/icons/logo-black.png"}
          width={100}
          height={100}
        />
      </div>

      <Link href="#up">
        <Button className="border border-slate-950 text-slate-950 bg-white shadow-xl p-2 rounded-full fixed sm:bottom-36 bottom-20 hover:bg-orange-400 hover:text-white right-10">
          <ArrowUp />
        </Button>
      </Link>
    </div>
  );
};

export default Footer;
