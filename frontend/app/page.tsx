import LogoBrand from "@/components/logoBrand";
import NavCon from "@/components/navCon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-primary h-full overflow-hidden">
      <div className="flex w-full p-5 m-auto">
        <nav className="flex justify-between items-center flex-row w-full">
          <ul className="flex justify-center items-center gap-8 px-8">
            {/*Logo Brand*/}
            <LogoBrand />
            <Link
              href="/"
              className="font-sans text-white tracking-wide uppercase font-semibold text-3xl hover:text-gray-300"
            >
              Shop
            </Link>
            <Link
              href="/support"
              className="font-sans text-white tracking-wide hover:text-gray-300"
            >
              Assistance
            </Link>
          </ul>
           <NavCon />
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
