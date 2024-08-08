import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const MobileBanner = () => {
  return (
    <div className="mb-20 text-center p-0 shadow-md flex justify-between  rounded-xl ">
      <div className="p-2">
        <h1 className="font-extrabold mb-5 text-orange-400  text-3xl">
          21stCampus
        </h1>
        <h1 className="font-bold capitalize text-slate-950 text-3xl mb-5">
          Learning a trade is made simple and <br />
          <span className="brand-2">flexible</span> for You!!
        </h1>
        <Image
          src={"/icons/image0.png"}
          alt="African in African wear with a radio in his hand"
          height={350}
          width={500}
          className="rounded-xl mb-5 w-full"
        />
        <p className="capitalize mb-5">
          Gone are the old days. Paradigms have changed. Let’s embrace the new
          era. Experience it with us!!
        </p>
        <div className="flex gap-5 justify-center">
          <Link href={"/sign-in"}>
            <Button className=" w-fit bg-transparent font-bold border-2 text-slate-900 border-slate-900 hover:bg-orange-400 hover:text-white hover:border-none">
              Sign In
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="brand-bg-1 w-fit font-bold rounded text-white hover:bg-orange-400">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileBanner;
